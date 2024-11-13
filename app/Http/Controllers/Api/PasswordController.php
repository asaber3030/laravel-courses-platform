<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\PasswordResetToken;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use App\Models\User;
use App\Mail\ResetPasswordMail;

class PasswordController extends Controller
{
  public function send_reset_code(Request $request)
  {
    $request->validate([
      'email' => 'required|email|exists:users,email'
    ]);

    $email = $request->input('email');
    $code = mt_rand(100000, 999999);

    PasswordResetToken::where('email', $email)->forceDelete();
    PasswordResetToken::create([
      'email' => $email,
      'token' => Hash::make($code)
    ]);

    Mail::to($email)->send(new ResetPasswordMail($code));

    return response()->json([
      'message' => 'تم إرسال رمز إعادة تعيين كلمة المرور إلى بريدك الإلكتروني'
    ]);
  }

  public function is_code_valid(Request $request)
  {
    $request->validate([
      'code' => 'required|numeric',
      'email' => 'required|email|exists:users,email'
    ]);
    $code = $request->input('code');
    $email = $request->input('email');
    $find_token = PasswordResetToken::where('email', $email)->first();
    $is_valid = Hash::check($code, $find_token->token);

    return response()->json([
      'status' => $is_valid
    ]);
  }

  public function reset(Request $request)
  {
    $request->validate([
      'code' => 'required|numeric',
      'email' => 'required|email|exists:users,email',
      'new_password' => 'required|min:8'
    ]);

    $email = $request->input('email');
    $code = $request->input('code');
    $find_token = PasswordResetToken::where('email', $email)->exists();

    if (!$find_token) {
      return response()->json([
        'message' => 'Failed to reset password. Please request a new reset code.'
      ], 401);
    }

    $token = PasswordResetToken::where('email', $email)->first();
    $is_valid = Hash::check($code, $token->token);

    if ($is_valid) {
      User::where('email', $email)->update([
        'password' => Hash::make($request->input('new_password'))
      ]);
      PasswordResetToken::where('email', $email)->forceDelete();
      return response()->json([
        'message' => 'تم تغيير كلمة المرور بنجاح',
      ]);
    }
    return response()->json([
      'message' => 'فشل تغيير كلمة المرور. الرجاء التحقق من الرمز.'
    ]);
  }
}
