<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Group;
use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class PostController extends Controller
{
    public function store(Request $request, $code_group){
        $group = Group::firstWhere('code',$code_group);
        if (!$group) {
            return response([
                'message' => 'Group Not Found'
            ], 404);
        }

        $validasi = Validator::make($request->all(), [
            'title' => 'required',
            'img' => 'required',
            'desc' => 'required'
        ]);

        if ($validasi->fails()) {
            return response()->json($validasi->errors(), 422);
        }

        $post = Post::create([
            'title' => $request->title,
            'img' => $request->img,
            'desc' => $request->desc,
            'group_id' => $group->id,
            'user_id' => $request->user()->id
        ]);

        if ($post) {
            return response()->json([
                'message' => 'Post created',
                'data' => $post
            ], 201);
        }

        return response()->json([
            'success' => false
        ], 409);
    }

    public function getPosts($code_group){
        $group = Group::firstWhere('code', $code_group);

        if (!$group) {
            return response([
                'message' => 'Group Not Found'
            ], 404);
        }
        $posts = Post::where('group_id', $group->id)->with('user')->get();

        return response()->json([
            'message' => 'Post successfully fetching',
            'data' => $posts
        ], 200);
    }

    public function store_love($id){
        $post = Post::find($id);
        if (!$post) {
            return response([
                'message' => 'Post Not Found'
            ], 404);
        }

        $post->update([
            'loves' => $post->loves + 1
        ]);

        return response()->json([
            'data' => $post
        ]);
    }
}
