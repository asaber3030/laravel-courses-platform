<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\CourseSubscription;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
	public function subscriptions()
	{
		$user = Auth::user();
		$subscriptions = CourseSubscription::where('user_id', $user->getAuthIdentifier())->with('course')->simplePaginate();
		return response()->json([
			'message' => 'Subscriptions',
			'data' => $subscriptions
		]);
	}

	public function view_subscription(CourseSubscription $subscription)
	{
		$user = Auth::user();
		if ($subscription->user_id != $user->getAuthIdentifier()) {
			return response()->json(['message' => 'هذا الاشتراك لا ينتمي لك'], 403);
		}
		$data = CourseSubscription::with('course')->where('id', $subscription->id)->first();
		return response()->json([
			'message' => 'Subscription Data',
			'data' => $data
		]);
	}
}
