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
        Schema::create('meals', function (Blueprint $table) {
            $table->id();
            $table->string('name')->unique()->nullable(false);
            $table->string('description')->nullable(false);
            $table->string('image_path')->nullable(false);
            $table->string('price')->nullable(false);
            $table->boolean('active')->nullable(false);
            $table->timestamp('active_until')->nullable()->nullable(false);
            $table->time('daily_cutoff_time')->nullable()->nullable(false);
            $table->integer('bulk_buy_discount')->nullable(false);
            $table->integer('bulk_buy_portions')->nullable(false);
            $table->string('eta')->nullable(false);
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
