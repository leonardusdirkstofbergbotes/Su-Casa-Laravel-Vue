<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


Route::get('/', 'App\Http\Controllers\CategoryController@getAll')->name('getAllCategories');

Route::post('/create', 'App\Http\Controllers\CategoryController@create')->name('createCategory');

Route::get('/get/{id}', 'App\Http\Controllers\CategoryController@get')->name('getCategory');

Route::post('/update/{id}', 'App\Http\Controllers\CategoryController@update')->name('updateCategory');

Route::delete('/delete/{id}', 'App\Http\Controllers\CategoryController@destroy')->name('deleteCategory');
