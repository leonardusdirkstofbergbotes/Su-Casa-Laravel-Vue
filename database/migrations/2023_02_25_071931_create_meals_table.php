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
        Schema::create('foods', function (Blueprint $table) {
            $table->id();
            $table->string('name')->unique()->nullable(false);
            $table->string('description')->nullable(false);
            $table->string('imagePath')->nullable(false);
            $table->string('price')->nullable(false);
            $table->boolean('active')->nullable(false);
            $table->timestamp('activeUntil')->nullable();
            $table->time('dailyCutoffTime')->nullable();
            $table->integer('bulkBuyDiscount')->nullable();
            $table->integer('bulkBuyPortions')->nullable();
            $table->string('eta')->nullable();
            $table->boolean('promote')->nullable(false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('meals');
    }
};
