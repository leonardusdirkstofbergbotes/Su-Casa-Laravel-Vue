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

Route::post('/auth/register', 'App\Http\Controllers\AuthController@createUser');
Route::post('/auth/login', 'App\Http\Controllers\AuthController@loginUser');
Route::post('/auth/forgot-password', 'App\Http\Controllers\AuthController@forgotPassword');


Route::prefix('categories')
    ->group(base_path('routes/categories.php'));

Route::get('/test', function () {
    return 'Hello World';
});
