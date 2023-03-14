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
        Schema::create('order_details', function (Blueprint $table) {
            $table->id();
            $table->integer('orderId')->nullable(false);
            $table->integer('mealId')->nullable(false);
            $table->integer('quantity')->nullable(false);
            $table->string('note')->nullable(true);
            $table->string('total')->nullable(false);
            $table->timestamps();

            $table->foreign('orderId')->references('id')->on('orders')->onDelete('cascade');
            $table->foreign('mealId')->references('id')->on('meals');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('order_details');
    }
};
