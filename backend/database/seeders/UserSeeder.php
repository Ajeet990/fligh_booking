<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\UserModel;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('users')->insert([
            'name' => 'superadmin',
            'email' => 'superadmin@yopmail.com',
            'password' => Hash::make('superadmin'),
            'phone' => '8105982880',
            'role' => 0,
            'is_verified' => 1,
            'image' => 'no image'
        ]);
    }
}
