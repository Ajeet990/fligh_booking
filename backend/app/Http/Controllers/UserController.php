<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\Handlers\Error;
use App\Models\UserModel;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Log;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;
use Exception;


class UserController extends Controller
{
    public function login(Request $request)
    {
        try {
            $validator = Validator::make($request->all(), [
                'email' => 'required|string|email|max:150',
                'password' => 'required|string|min:8|max:255'
            ]);
        
            if ($validator->fails()) {
                throw new \Exception('All fields are required.');
            }
            $validatedData = $validator->validated();
            
            $user = UserModel::where('email', $validatedData['email'])->first();
            if (empty($user)) {
                throw new \Exception('User not registered');
            }
            $payload = [
                'email' => $validatedData['email']
            ];
            if (Hash::check($validatedData['password'], $user['password'])) {
                return response()->json([
                    'success' => true,
                    'message' => 'Login success',
                    // 'role' => $user->role,
                    'data' => [
                        'role' => $user->role,
                        'name' => $user->name,
                        'email' => $user->email,
                        'token' => JWT::encode($payload, env('JWT_SECRET'), env('JWT_ALGORITHM'))
                    ]
                ]);
            } else {
                throw new \Exception('Password wrong.');
            }
        } catch (\Exception $e) {
            return Error::Handle($e);
        }
    }

    public function uploadImage(Request $request)
    {
        try {
            $image = $request->file('file');
            $allowedExtensions = ['jpeg','png','jpg','gif','svg'];
            $extension = $image->getClientOriginalExtension();
            if (!in_array($extension, $allowedExtensions)) {
                throw new \Exception('Invalid image');
            }

            $size = $image->getSize();
            if ($size > env('MAX_SIZE_IMAGE')) {
                throw new \Exception('Maximum image size should be of 2 MB.');
            }
            $imagePath = $request->file('file')->store('profiles', 'public');


            if (!empty($imagePath)) {
                return response()->json([
                    'success' => true,
                    'message' => 'Image uploaded',
                    'link' => $imagePath
                ]);
            } else {
                throw new \Exception('Unable to upload image');
            }
        } catch(\Exception $e) {
            return Error::Handle($e);
        }
    }


    public function register(Request $request) 
    {
        try {
            $validator = Validator::make($request->all(), [
                'name' => 'required|string|max:100',
                'email' => 'required|string|email|max:150',
                'password' => 'required|string|min:8|max:255',
                'phone' => 'required|string|max:15',
                'role' => 'required|string',
                'image' => 'required|string'
            ]);
        
            if ($validator->fails()) {
                throw new \Exception('Please fill all fields.');
            }
            $validatedData = $validator->validated();

            $emailAlreadyRegistered = UserModel::where('email', $validatedData['email'])->get();
            if (!$emailAlreadyRegistered->isEmpty()) {
                throw new \Exception("Email already exists.");
            }
            $phoneAlreadyRegistered = UserModel::where('phone', $validatedData['phone'])->get();
            if (!$phoneAlreadyRegistered->isEmpty()) {
                throw new \Exception("Phone already exist.");
            }
            $userObj = new UserModel;
            $userObj->name = $validatedData['name'];
            $userObj->email = $validatedData['email'];
            $userObj->password = Hash::make($validatedData['password']);
            $userObj->phone = $validatedData['phone'];
            $userObj->role = $validatedData['role'];
            $userObj->is_verified = ($validatedData['role'] == 1) ? 0 : 1;
            $userObj->image = $validatedData['image'];
            $registered = $userObj->save();
            if ($registered) {
                return response()->json([
                    'success' => true,
                    'message' => 'Registered successfully.',
                    'inserted_id' => $userObj->id
                ]);
            } else {
                throw new \Exception('Unable to register. Please try again.');
            }

        } catch(\Exception $e) {
            return Error::Handle($e);
        }
    }
}
