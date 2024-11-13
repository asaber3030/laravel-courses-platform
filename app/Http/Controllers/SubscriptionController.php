<?php

namespace App\Http\Controllers;

use App\Models\CourseSubscription;
use Illuminate\Http\Request;
use App\Models\Course;

class SubscriptionController extends Controller
{
	public function view_subscriptions(Request $request, Course $course)
	{
		$search = $request->query('search');
		$subscriptions = CourseSubscription::where(
			'course_id',
			$course->id
		)
			->where(function ($query) use ($search) {
				$query->when($search, function ($q) use ($search) {
					$q->where('id', $search)
						->orWhereHas('user', function ($q) use ($search) {
							$q->where('name', 'like', '%' . $search . '%')
								->orWhere('email', 'like', '%' . $search . '%');
						});
				});
			})
			->with(['user', 'course'])
			->paginate();

		return inertia('courses/subscriptions', [
			'course' => $course,
			'subscriptions' => $subscriptions
		]);
	}

	public function change_subscription_status(Request $request, Course $course, CourseSubscription $subscription)
	{
		$new_status = $subscription->status === 'active' ? 'inactive' : 'active';
		CourseSubscription::where('id', $subscription->id)->update([
			'status' => $new_status
		]);
		session()->flash('message', $new_status === 'active' ? 'تم اعادة تفعيل الكورس للمستخدم' : 'تم وقف الكورس للمستخدم');
	}
}
