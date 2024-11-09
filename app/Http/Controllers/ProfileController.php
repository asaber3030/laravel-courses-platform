<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class ProfileController extends Controller
{

  public function edit(Request $request): Response
  {
    return Inertia::render('profile/edit', [
      'mustVerifyEmail' => $request->user('teacher') instanceof MustVerifyEmail,
      'status' => session('status'),
    ]);
  }

  public function update(ProfileUpdateRequest $request): RedirectResponse
  {
    $request->user('teacher')->fill($request->validated());
    if ($request->user('teacher')->isDirty('email')) {
      $request->user('teacher')->email_verified_at = null;
    }

    $request->user('teacher')->save();
    return Redirect::route('profile.edit');
  }

  public function destroy(Request $request): RedirectResponse
  {
    $request->validate([
      'password' => ['required', 'current_password'],
    ]);

    $user = $request->user('teacher');

    Auth::logout();

    $user->delete();

    $request->session()->invalidate();
    $request->session()->regenerateToken();

    return Redirect::to('/');
  }
}
