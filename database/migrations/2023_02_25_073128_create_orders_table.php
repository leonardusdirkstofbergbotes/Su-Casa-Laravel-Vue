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
            $table->string('reference_number')->nullable(false);
            $table->integer('user_id')->nullable(false);
            $table->timestamp('date_and_time')->nullable(false);
            $table->string('status')->nullable(false);
            $table->string('note')->nullable(true);
            $table->string('grand_total')->nullable(false);
            $table->string('collect_or_deliver')->nullable(false);
            $table->string('collection_charge')->nullable(false);
            $table->string('eta')->nullable(false);
            $table->string('payment_status')->nullable(false);
            $table->timestamps();

            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
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
