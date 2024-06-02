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
        Schema::create('flight_schedule', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('airplane_id');
            $table->foreign('airplane_id')->references('id')->on('airplanes')->onDelete('cascade')->onUpdate('cascade');
            $table->unsignedBigInteger('from');
            $table->foreign('from')->references('id')->on('cities')->onDelete('cascade')->onUpdate('cascade');
            $table->unsignedBigInteger('to');
            $table->foreign('to')->references('id')->on('cities')->onDelete('cascade')->onUpdate('cascade');
            $table->string('date');
            $table->string('time');
            $table->decimal('ticket_price', 12, 2);
            $table->string('time_duration');
            $table->boolean('is_completed')->comment('0:not completed, 1:completed');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('flight_schedule');
    }
};
