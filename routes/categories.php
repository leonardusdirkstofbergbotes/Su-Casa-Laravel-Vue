<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


Route::get('/', 'App\Http\Controllers\CategoryController@getAll')->name('getAllCategories');

Route::get('/{id}', 'App\Http\Controllers\CategoryController@get')->name('getCategory');
