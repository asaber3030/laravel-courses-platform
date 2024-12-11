<?php

use App\Http\Controllers\CourseController;
use App\Http\Controllers\FileController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\LectureController;
use App\Http\Controllers\LectureItemController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\SubscriptionController;
use Illuminate\Support\Facades\Route;


Route::get('/', [HomeController::class, 'home'])->name('home');
Route::get('test-upload', [FileController::class, 'test_upload'])->name('files.view');

Route::get('uploads/view', [FileController::class, 'uploads_view'])->name('files.view.uploads');
Route::post('uploads/view', [FileController::class, 'handle_upload'])->name('files.view.uploads.ps');

Route::middleware('teacher.auth')->group(function () {

  Route::get('/dashboard', [HomeController::class, 'dashboard_index'])->name('dashboard');

  Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
  Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
  Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

  Route::get('/subscriptions', [HomeController::class, 'subscriptions'])->name('subscriptions');

  Route::prefix('courses')->as('courses.')->group(function () {
    Route::controller(CourseController::class)->group(function () {
      Route::get('/', 'index')->name('list');
      Route::get('/create', 'create_view')->name('create.view');
      Route::post('/create', 'create_action')->name('create.action');

      Route::get('/{course}', 'view')->name('view');

      Route::get('/{course}/update', 'update_view')->name('update.view');
      Route::post('/{course}/update', 'update_action')->name('update.action');
      Route::delete('/{course}/delete', 'delete_action')->name('delete.action');

      Route::post('/{course}/quick-activate', 'quick_activate_action')->name('activate.quick.action');
      Route::get('/{course}/ratings', 'ratings_view')->name('ratings.view');
    });

    Route::controller(SubscriptionController::class)->group(function () {
      Route::get('/{course}/subscriptions', 'view_subscriptions')->name('subscriptions.view');
      Route::post('/{course}/subscriptions/{subscription}/trigger-status', 'change_subscription_status')->name('subscriptions.trigger');
      Route::get('/{course}/subscriptions/create', 'create_subscription_view')->name('subscriptions.create.view');
      Route::post('/{course}/subscriptions/create', 'create_subscription_action')->name('subscriptions.create.action');
    });

    Route::controller(LectureController::class)->group(function () {
      Route::post('/{course}/lectures/create', 'create_lecture_action')->name('lectures.create.action');
      Route::get('/{course}/lectures/{lecture}', 'view_lecture_view')->name('lectures.view');
      Route::patch('/{course}/lectures/{lecture}/update', 'update_lecture_action')->name('lectures.update.action');
      Route::post('/{course}/lectures/{lecture}/delete', 'delete_lecture_action')->name('lectures.delete.action');
    });

    Route::controller(LectureItemController::class)->group(function () {
      Route::get('/{course}/lectures/{lecture}/items/create', 'create_item_view')->name('lectures.items.create.view');
      Route::post('/{course}/lectures/{lecture}/items/create', 'create_item_action')->name('lectures.items.create.action');

      Route::get('/{course}/lectures/{lecture}/items/{item}/update', 'update_item_view')->name('lectures.items.update.view');
      Route::post('/{course}/lectures/{lecture}/items/{item}/update', 'update_item_action')->name('lectures.items.update.action');

      Route::post('/{course}/lectures/{lecture}/items/{item}/delete', 'delete_item_action')->name('lectures.items.delete.action');
    });
  });
});

require __DIR__ . '/auth.php';
