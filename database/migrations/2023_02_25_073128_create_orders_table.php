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
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->string('referenceNumber')->nullable(false);
            $table->integer('userId')->nullable(false);
            $table->timestamp('dateAndTime')->nullable(false);
            $table->string('status')->nullable(false);
            $table->string('note')->nullable(true);
            $table->string('grandTotal')->nullable(false);
            $table->string('collectOrDeliver')->nullable(false);
            $table->string('collectionCharge')->nullable();
            $table->string('eta')->nullable(false);
            $table->string('paymentStatus')->nullable(false);
            $table->timestamps();

            $table->foreign('userId')->references('id')->on('users')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};
