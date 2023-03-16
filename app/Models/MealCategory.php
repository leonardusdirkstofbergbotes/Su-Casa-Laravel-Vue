<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

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

    public function meal(): BelongsTo {
        return $this->belongsTo(Meal::class, 'mealId');
    }

    public function categories(): HasMany {
        return $this->hasMany(Category::class, 'categoryId');
    }
}
