<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    use HasFactory;

    protected $table = 'categories';
    protected $primaryKey = 'id';
    protected $guarded = [];
    public $rules = [
        'name' => 'required|unique:categories|max:255|string',
        'description' => 'required|max:1000|string',
        'imagePath' => 'required|max:1000|string',
        'active' => 'required|boolean',
        'promote' => 'required|boolean'
    ];
}
