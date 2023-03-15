<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MealCategory extends Model
{
    use HasFactory;

    protected $table = 'meal_categories';
    protected $primaryKey = 'id';
    protected $guarded = [];

    public $rules = [
        'mealId' => 'required|integer',
        'categoryId' => 'required|integer'
    ];
}
