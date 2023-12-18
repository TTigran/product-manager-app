<?php

use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});


Route::get('/api/users', [UserController::class, 'index']); // Get all users
Route::get('/api/users/{id}', [UserController::class, 'show']); // Get a specific user by ID
Route::post('/api/users', [UserController::class, 'store']); // Create a new user
Route::put('/api/users/{id}', [UserController::class, 'update']); // Update a user by ID
Route::delete('/api/users/{id}', [UserController::class, 'destroy']); // Delete a user by ID

Route::get('/api/products', [ProductController::class, 'index']); // Get all products
Route::get('/api/products/{id}', [ProductController::class, 'show']); // Get a specific product by ID
Route::post('/api/products', [ProductController::class, 'store']); // Create a new product
Route::put('/api/products/{id}', [ProductController::class, 'update']); // Update a product by ID
Route::delete('/api/products/{id}', [ProductController::class, 'destroy']); // Delete a product by ID

Route::get('/api/category', [CategoryController::class, 'index']); // Get all categories
Route::get('/api/category/{id}', [CategoryController::class, 'show']); // Get a specific category by ID
Route::post('/api/category', [CategoryController::class, 'store']); // Create a new category
Route::put('/api/category/{id}', [CategoryController::class, 'update']); // Update a category by ID
Route::delete('/api/category/{id}', [CategoryController::class, 'destroy']); // Delete a category by ID
