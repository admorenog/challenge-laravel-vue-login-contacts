<?php

use App\Http\Controllers\ContactController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\RegisterController as AuthRegisterController;
use App\Http\Controllers\Auth\LoginController as AuthLoginController;

Route::prefix('auth')->group(function () {
    Route::post('register', [AuthRegisterController::class, 'register'])->name('api.auth.register');
    Route::post('login', [AuthLoginController::class, 'login'])->name('api.auth.login');
    Route::post('logout', [AuthLoginController::class, 'logout'])->name('api.auth.logout');
});

Route::middleware('auth:sanctum')->group(function () {
    Route::get('contacts', [ContactController::class, 'index'])->name('contacts.index');
    Route::post('contacts', [ContactController::class, 'create'])->name('contacts.create');
    Route::get('contacts/{id}', [ContactController::class, 'get'])->name('contacts.get');
    Route::put('contacts/{id}', [ContactController::class, 'update'])->name('contacts.update');
    Route::delete('contacts/{id}', [ContactController::class, 'delete'])->name('contacts.delete');
});

