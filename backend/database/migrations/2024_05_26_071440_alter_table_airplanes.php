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
        Schema::table('airplanes', function (Blueprint $table) {
            $table->unsignedBigInteger('owner_id');
            $table->foreign('owner_id')->references('id')->on('users')->onDelete('cascade')->onUpdate('cascade')->after('airplane_capacity');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('airplanes', function (Blueprint $table) {
            $table->dropColumn('owner_id');
        });
    }
};