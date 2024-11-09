<?php

use App\Http\Controllers\CourseController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
  return Inertia::render('Welcome', [
    'canLogin' => Route::has('login'),
    'canRegister' => Route::has('register'),
    'laravelVersion' => Application::VERSION,
    'phpVersion' => PHP_VERSION,
  ]);
});

Route::get('/dashboard', function () {
  return Inertia::render('dashboard');
})->name('dashboard');

Route::middleware('teacher.auth')->group(function () {
  Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
  Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
  Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

  // Courses Routes
  Route::controller(CourseController::class)->as('courses.')->prefix('courses')->group(function () {
    Route::get('/', 'index')->name('list');
    Route::get('/create', 'create_view')->name('create.view');
    Route::post('/create', 'create_action')->name('create.action');

    Route::get('/{course}', 'view')->name('view');

    Route::get('/{course}/update', 'update_view')->name('update.view');
    Route::post('/{course}/update', 'update_action')->name('update.action');
    Route::delete('/{course}/delete', 'delete_action')->name('delete.action');

    Route::post('/{course}/quick-activate', 'quick_activate_action')->name('activate.quick.action');

    Route::get('/{course}/ratings', 'ratings_view')->name('ratings.view');

    Route::get('/{course}/subscriptions', 'view_subscriptions')->name('subscriptions.view');
    Route::get('/{course}/subscriptions/create', 'create_subscription_view')->name('subscriptions.create.view');
    Route::post('/{course}/subscriptions/create', 'create_subscription_action')->name('subscriptions.create.action');

    Route::get('/{course}/lectures', 'view')->name('lectures');
    Route::post('/{course}/lectures/create', 'create_lecture_action')->name('lectures.create.action');

    Route::get('/{course}/lectures/{lecture}', 'view_lecture_view')->name('lectures.view');
    Route::patch('/{course}/lectures/{lecture}/update', 'update_lecture_action')->name('lectures.update.action');
    Route::post('/{course}/lectures/{lecture}/delete', 'delete_lecture_action')->name('lectures.delete.action');

    Route::get('/{course}/lectures/{lecture}/items/create', 'create_item_view')->name('lectures.items.create.view');
    Route::post('/{course}/lectures/{lecture}/items/create', 'create_item_action')->name('lectures.items.create.action');

    Route::get('/{course}/lectures/{lecture}/items/{item}', 'update_item_view')->name('lectures.items.view');
    Route::get('/{course}/lectures/{lecture}/items/{item}/update', 'update_item_view')->name('lectures.items.update.view');
    Route::patch('/{course}/lectures/{lecture}/items/{item}/update', 'update_item_action')->name('lectures.items.update.action');

    Route::post('/{course}/lectures/{lecture}/items/{item}/delete', 'delete_item_action')->name('lectures.items.delete.action');
  });
});

require __DIR__ . '/auth.php';
