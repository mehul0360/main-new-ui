<?php

use App\Http\Controllers\ConnectionController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    if (auth()->check()) {
        return redirect()->route('home');
    }

    return view('auth.login');
});

Auth::routes();

Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');

Route::middleware('auth')->group(function () {
    Route::prefix('connections')->name('connections')->group(function () {
        Route::get('/', [ConnectionController::class, 'index'])->name('.index');
        Route::get('/build', [ConnectionController::class, 'create'])->name('.build');
    });
    Route::get('/connections/build', [ConnectionController::class, 'create'])->name('connections.build');
});
