<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Group;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;

class GroupController extends Controller
{
    public function store (Request $request){
        $validasi = Validator::make($request->all(),[
            'thumb' => 'image|mimes:png,jpg',
            'group_name' => 'required'
        ]);

        if ($validasi->fails()) {
            return response()->json($validasi->errors(), 422);
        }

        $thumb = '';
        if ($request->file('thumb')) {
            $thumb = $request->file('thumb')->store('group_thumb');
        }

        $words = Str::of($request->group_name)->explode(' ');
        $first_letters = '';

        foreach ($words as $word) {
            $first_letters .= strtoupper($word[0]);
        }
        $random_numbers = rand(100, 999);
        $code = $first_letters . $random_numbers;

        $group = Group::create([
            'code' => $code,
            'thumb' => $thumb,
            'group_name' => $request->group_name
        ]);

        if ($group) {
            return response()->json([
                'message' => 'Group Created',
                'data' => $group
            ], 201);
        }

        return response()->json([
            'success' => false
        ], 409);
    }

    public function search(Request $request){
        $validasi = Validator::make($request->all(),[
            'code' => 'required'
        ]);

        if ($validasi->fails()) {
            return response()->json($validasi->errors(), 422);
        }

        $group = Group::firstWhere('code', $request->code);

        if ($group) {
            return response()->json([
                'message' => 'Group found',
                'data' => $group
            ], 200);
        }

        return response()->json([
            'message' => 'Group not found'
        ], 404);
    }

    public function join(Request $request, $code){
        $group = Group::firstWhere('code', $code);
        if (!$group) {
            return response()->json([
                'message' => 'Group Not Found'
            ], 404);
        }

        $useInGroup = DB::table('group_user')->insert([
            ['user_id' => $request->user()->id, 'group_id' => $group->id]
        ]);

        if ($useInGroup) {
            return response()->json([
                'message' => 'Successfully join on group',
                'data' => $useInGroup
            ], 201);
        }

        return response()->json([
            'success' => false,
        ], 409);
    }

    public function getGroups(Request $request){
        $user = User::find($request->user()->id);
        return response()->json([
            'data' => $user->group
        ]);
    }

    public function getGroupDetail($code){
        $group = Group::where('code', $code)->with('user')->first();
        if (!$group) {
            return response()->json([
                'message' => 'Group Not Found'
            ], 404);
        }

        return response()->json([
            'message' => 'Successfully getting group detail',
            'data' => $group
        ], 200);
    }
}
