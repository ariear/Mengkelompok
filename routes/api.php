<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\GroupController;
use App\Http\Controllers\Api\PostController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::post('/register', [AuthController::class,'register']);
Route::post('/login', [AuthController::class,'login']);
Route::post('/logout', [AuthController::class,'logout']);

Route::middleware(['auth:sanctum'])->group(function () {
    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    Route::post('/group', [GroupController::class,'store']);
    Route::post('/group/search', [GroupController::class,'search']);
    Route::post('/group/{code}/join',[GroupController::class,'join']);
    Route::get('/group',[GroupController::class,'getGroups']);
    Route::get('/group/{code}',[GroupController::class,'getGroupDetail']);

    Route::post('/post/{code_group}', [PostController::class,'store']);
    Route::post('/post/love/{id}', [PostController::class,'store_love']);
    Route::get('/post/{code_group}', [PostController::class,'getPosts']);
});
