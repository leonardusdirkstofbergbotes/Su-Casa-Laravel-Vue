<?php
use Illuminate\Support\Facades\Route;


Route::get('/', 'App\Http\Controllers\MealsController@getAll')->name('getAllMeals');

Route::post('/create', 'App\Http\Controllers\MealsController@create')->name('createMeal');

Route::get('/get/{id}', 'App\Http\Controllers\MealsController@get')->name('getMeal');

Route::post('/update/{id}', 'App\Http\Controllers\MealsController@update')->name('updateMeal');

Route::delete('/delete/{id}', 'App\Http\Controllers\MealsController@destroy')->name('deleteMeal');
