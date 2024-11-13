<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use Illuminate\Support\Facades\Mail;
use App\Models\EmailVerificationToken;
use App\Mail\VerifyAccountMail;

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
    $email = $request->input('email');
    $code = mt_rand(100000, 999999);

    Mail::to($email)->send(new VerifyAccountMail($code));

    EmailVerificationToken::create([
      'email' => $user->email,
      'token' => Hash::make($code),
    ]);

    return response()->json([
      'message' => 'تم انشاء المستخدم بنجاح. تم ارسال رمز التحقق الى بريدك الالكتروني',
      'data' => [
        'user' => $user,
        'token' => $token,
      ]
    ], 201);
  }
  public function send_verification_code(Request $request)
  {
    $request->validate([
      'email' => 'required|email|exists:users,email'
    ]);

    $email = $request->input('email');
    $code = mt_rand(100000, 999999);

    $find_is_verified = User::where('email', $email)->first();
    if (isset($find_is_verified->email_verified_at)) {
      return response()->json([
        'message' => 'الحساب مفعل بالفعل',
      ]);
    }

    EmailVerificationToken::where('email', $email)->forceDelete();
    EmailVerificationToken::create([
      'email' => $email,
      'token' => Hash::make($code)
    ]);

    Mail::to($email)->send(new VerifyAccountMail($code));

    return response()->json([
      'message' => 'تم ارسال رمز التحقق الى بريدك الالكتروني',
    ]);
  }

  public function is_verification_code_valid(Request $request)
  {
    $request->validate([
      'email' => 'required|email|exists:users,email',
      'code' => 'required|integer',
    ]);

    $email = $request->input('email');
    $code = $request->input('code');

    $token = EmailVerificationToken::where('email', $email)->first();

    if (!$token) {
      return response()->json(['message' => 'لا يوجد'], 400);
    }

    $is_valid = Hash::check($code, $token->token);
    if ($is_valid) {
      User::where('email', $email)->update(['email_verified_at' => now()]);
      EmailVerificationToken::where('email', $email)->forceDelete();
      return response()->json(['message' => 'تم تفعيل الحساب بنجاح'], 200);
    }
    return response()->json(['message' => 'خطأ. الرقم المدخل غير صحيح. او ربما حدث خطأ ما.'], 200);
  }
  public function update_profile(Request $request)
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

  public function update_password(Request $request)
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

  public function me(Request $request)
  {
    return response()->json([
      'message' => 'Authorized',
      'user' => $request->user(),
    ]);
  }
}
