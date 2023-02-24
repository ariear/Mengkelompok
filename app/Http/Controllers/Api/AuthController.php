<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;

class AuthController extends Controller
{
    public function register (Request $request){
        $validasi = Validator::make($request->all(), [
            'name' => 'required',
            'email' => 'required|email|unique:users',
            'password' => 'required|min:4'
        ]);

        if ($validasi->fails()) {
            return response()->json($validasi->errors(), 422);
        }

        $user = User::create([
            'pp' => 'https://ui-avatars.com/api/?background=random&name=' . $request->name,
            'code' => strtolower(Str::random(20)),
            'name' => $request->name,
            'email' => $request->email,
            'password' => bcrypt($request->password),
        ]);

        if ($user) {
            return response()->json([
                'message' => 'Register Succesfully',
                'data' => $user
            ], 201);
        }

        return response()->json([
            'success' => false
        ], 409);
    }

    public function login (Request $request){
        $validasi = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required|min:4'
        ]);

        if ($validasi->fails()) {
            return response()->json($validasi->errors(), 422);
        }

        if (!Auth::attempt($request->only('email','password'))) {
            return response()->json([
                'message' => 'Unauthorizated'
            ], 401);
        }

        $user = User::firstWhere('email', $request->email);

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'message' => 'Login Successfully',
            'token' => $token,
            'token_type' => 'Bearer'
        ]);
    }

    public function logout () {
        auth()->user()->tokens()->delete();

        return [
            'message' => 'You have successfully logged out and the token was successfully deleted'
        ];
    }
}
