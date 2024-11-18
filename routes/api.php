<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\CourseController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\PasswordController;
use Illuminate\Support\Facades\Route;

Route::as('api.')->prefix('v1/')->group(function () {

  Route::controller(AuthController::class)->group(function () {
    Route::post('login', 'login')->name('login');
    Route::post('register', 'register')->name('register');

    Route::post('email/send-code', 'send_verification_code')->name('email.send-code');
    Route::post('email/code-valid', 'is_verification_code_valid')->name('email.code-valid');

    Route::middleware('auth:sanctum')->group(function () {
      Route::get('me', 'me');
      Route::patch('update/profile', 'update_profile');
      Route::patch('update/password', 'update_password');
    });
  });

  Route::controller(PasswordController::class)->group(function () {
    Route::post('password/reset-code', 'send_reset_code')->name('password.send-reset-code');
    Route::post('password/code-valid', 'is_code_valid')->name('password.code-valid');
    Route::post('password/reset', 'reset')->name('password.reset');
  });

  Route::middleware('auth:sanctum')->group(function () {
    Route::controller(CourseController::class)->group(function () {
      Route::get('subscribed-courses', 'subscribed_courses')->name('subscribed-courses');
      Route::get('courses/{course}', 'get_course')->name('courses.view');
      Route::get('courses/{course}/ratings', 'get_course_ratings')->name('courses.ratings');
      Route::get('courses/{course}/lectures', 'course_lectures')->name('courses.lectures');
      Route::get('courses/{course}/lectures/{lecture}', 'view_lecture')->name('courses.lecture');
      Route::get('courses/{course}/lectures/{lecture}/items', 'lecture_items')->name('courses.lecture.items');
      Route::get('courses/{course}/lectures/{lecture}/items/{item}', 'view_item')->name('courses.lecture.item');
    });

    Route::controller(UserController::class)->group(function () {
      Route::get('subscriptions', 'subscriptions')->name('subscriptions');
      Route::get('subscriptions/{subscription}', 'view_subscription')->name('subscription.view');
    });
  });
});
