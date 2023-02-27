<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::post('/register', 'App\Http\Controllers\AuthController@createUser');
Route::post('/login', 'App\Http\Controllers\AuthController@loginUser');
Route::post('/forgot-password', 'App\Http\Controllers\AuthController@forgotPassword');
