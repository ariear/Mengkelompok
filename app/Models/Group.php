<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;
use App\Models\Post;

class Group extends Model
{
    use HasFactory;
    protected $guarded = [];

    public function user(){
        return $this->belongsToMany(User::class);
    }

    public function post(){
        return $this->hasMany(Post::class);
    }
}
