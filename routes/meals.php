<?php
use Illuminate\Support\Facades\Route;


Route::get('/', 'App\Http\Controllers\MealController@getAll')->name('getAllMeals');

Route::post('/create', 'App\Http\Controllers\MealController@create')->name('createMeal');

Route::get('/get/{id}', 'App\Http\Controllers\MealController@get')->name('getMeal');

Route::post('/update/{id}', 'App\Http\Controllers\MealController@update')->name('updateMeal');

Route::delete('/delete/{id}', 'App\Http\Controllers\MealController@destroy')->name('deleteMeal');
