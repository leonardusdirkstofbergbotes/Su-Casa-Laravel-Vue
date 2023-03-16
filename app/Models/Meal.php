<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Meal extends Model
{
    use HasFactory;

    protected $table = 'meals';
    protected $primaryKey = 'id';
    protected $guarded = [];

    public $rules = [
        'name' => 'required|unique:meals|max:255|string',
        'description' => 'required|max:1000|string',
        'active' => 'required|boolean',
        'promote' => 'required|boolean',
        'price' => 'required|string',
        'bulkBuyPortions' => 'nullable|integer',
        'bulkBuyDiscount' => 'nullable|required_with:bulkBuyPortions|integer'
    ];

    public function editRules () {
        return [
            ...$this->rules,
            'name' => 'required|max:255|string',
        ];
    }

    public function categoryIds(): HasMany {
        return $this->hasMany(MealCategory::class, 'mealId');
    }
}
