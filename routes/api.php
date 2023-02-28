<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });

Route::prefix('auth')
    ->group(base_path('routes/auth.php'));

Route::prefix('categories')
    ->group(base_path('routes/categories.php'));



Route::get('/test', function () {
    return response()->json([
        'testing' => 'testing 123'
    ]);
});

Route::get('/test/email', 'App\Http\Controllers\EmailController@sendTestEmail');
