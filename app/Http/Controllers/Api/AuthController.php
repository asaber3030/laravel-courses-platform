<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Mail;
use App\Mail\ResetPasswordMail;

class AuthController extends Controller
{
  public function login(Request $request)
  {
    $request->validate([
      'email' => 'required|email',
      'password' => 'required',
    ]);

    if (!Auth::attempt($request->only('email', 'password'))) {
      return response()->json(['message' => 'البيانات غير صحيحة'], 401);
    }

    /** @var User $user **/
    $user = Auth::user();
    $token = $user->createToken('mobile-app-token')->plainTextToken;

    return response()->json([
      'message' => 'تم تسجيل الدخول بنجاح',
      'data' => [
        'token' => $token,
        'user' => User::where('id', $user->getAuthIdentifier())->with('faculty')->first(),
      ]
    ]);
  }

  public function register(Request $request)
  {
    $request->validate([
      'name' => 'required|string|max:255',
      'email' => 'required|string|email|max:255|unique:users',
      'phone' => 'required|string|max:11|unique:users|regex:/^01[0-2]{1}[0-9]{8}/',
      'password' => 'required|string|min:8|confirmed',
      'faculty_id' => 'required|integer|exists:faculties,id',
    ]);

    $user = User::create([
      'name' => $request->name,
      'email' => $request->email,
      'password' => Hash::make($request->password),
      'faculty_id' => $request->faculty_id,
      'phone' => $request->phone,
    ]);

    $token = $user->createToken('mobile-app-token')->plainTextToken;

    return response()->json([
      'message' => 'تم انشاء المستخدم بنجاح',
      'data' => [
        'user' => $user,
        'token' => $token,
      ]
    ], 201);
  }

  public function updateProfile(Request $request)
  {

    /** @var User $user **/
    $user = Auth::user();

    $request->validate([
      'name' => 'sometimes|string|max:255',
      'email' => 'sometimes|string|email|max:255|unique:users,email,' . $user->id,
      'faculty_id' => 'sometimes|integer',
      'phone' => 'sometimes|string|max:20',
    ]);

    $user->update($request->only('name', 'email', 'faculty_id', 'phone'));

    return response()->json([
      'message' => 'تم تحديث البيانات بنجاح',
      'user' => $user,
    ]);
  }

  public function updatePassword(Request $request)
  {
    $request->validate([
      'current_password' => 'required',
      'new_password' => 'required|string|min:8|confirmed',
    ]);

    /** @var User $user **/
    $user = Auth::user();

    if (!Hash::check($request->current_password, $user->password)) {
      return response()->json(['message' => 'Current password is incorrect'], 400);
    }

    $user->update([
      'password' => Hash::make($request->new_password),
    ]);

    return response()->json(['message' => 'Password updated successfully']);
  }

  public function sendResetLink(Request $request)
  {
    // Validate email input
    $request->validate([
      'email' => 'required|email|exists:users,email',
    ]);

    // Send the reset password link to the email
    $status = Password::sendResetLink(
      $request->only('email')
    );

    if ($status === Password::RESET_LINK_SENT) {
      return response()->json(['message' => 'Password reset link sent to your email.'], 200);
    }

    return response()->json(['message' => 'Failed to send reset link.'], 400);
  }

  public function resetPassword(Request $request)
  {
    $request->validate([
      'token' => 'required',
      'email' => 'required|email',
      'password' => 'required|string|min:8|confirmed',
    ]);

    $status = Password::reset(
      $request->only('email', 'password', 'password_confirmation', 'token'),
      function ($user) use ($request) {
        $user->forceFill([
          'password' => Hash::make($request->password),
        ])->save();
      }
    );

    if ($status === Password::PASSWORD_RESET) {
      return response()->json(['message' => 'Password successfully reset.'], 200);
    }

    return response()->json(['message' => 'Failed to reset password.'], 400);
  }
  public function me(Request $request)
  {
    return response()->json([
      'message' => 'Authorized',
      'user' => $request->user(),
    ]);
  }
}
