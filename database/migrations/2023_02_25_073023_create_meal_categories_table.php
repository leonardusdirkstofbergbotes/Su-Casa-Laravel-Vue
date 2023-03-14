<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('meal_categories', function (Blueprint $table) {
            $table->id();
            $table->integer('mealId')->nullable(false);
            $table->string('categoryId')->nullable(false);
            $table->timestamps();

            $table->foreign('mealId')->references('id')->on('meals')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('meal_categories');
    }
};
