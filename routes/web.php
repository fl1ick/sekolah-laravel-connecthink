<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;
use App\Http\Controllers\{KelasController ,SiswaController, GuruController ,DashboardController};

Route::get('/', function () {
    return Inertia::render('welcome', [
        'canRegister' => Features::enabled(Features::registration()),
    ]);
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', [DashboardController::class, 'index'])
    ->name('dashboard');

    Route::resource('kelas', KelasController::class)
    ->parameters(['kelas' => 'kelas'])
    ->only(['index', 'store', 'update', 'destroy']);

    Route::resource('siswa', SiswaController::class)
    ->parameters(['siswa' => 'siswa'])
    ->only(['index', 'store', 'update', 'destroy']);

    Route::resource('guru', GuruController::class)
    ->parameters(['guru' => 'guru'])
    ->only(['index', 'store', 'update', 'destroy']);

});


require __DIR__.'/settings.php';
