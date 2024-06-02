<?php

namespace App\Handlers;

use Exception;
use Illuminate\Http\JsonResponse;

class Error
{
    public static function handle(Exception $exception): JsonResponse
    {
        // Customize the response as needed
        return response()->json([
            'success' => false,
            'message' => $exception->getMessage(),
        ], 200);
    }
}
