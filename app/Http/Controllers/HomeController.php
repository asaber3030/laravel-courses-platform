<?php

namespace App\Http\Controllers;

use App\Models\Course;
use App\Models\CourseLecture;
use App\Models\CourseSubscription;
use App\Models\LectureItem;
use Illuminate\Http\Request;

class HomeController extends Controller
{
	public function home()
	{
		return inertia('home');
	}

	public function dashboard_index()
	{
		$teacher_id = auth('teacher')->id();

		$total_subscriptions = CourseSubscription::whereHas(
			'course',
			function ($q) use ($teacher_id) {
				$q->where('teacher_id', $teacher_id);
			}
		)->count();

		$total_lectures = CourseLecture::whereHas(
			'course',
			function ($q) use ($teacher_id) {
				$q->where('teacher_id', $teacher_id);
			}
		)->count();

		$total_courses = Course::where('teacher_id', $teacher_id)->count();

		$total_file_size = LectureItem::whereHas(
			'lecture',
			function ($q) use ($teacher_id) {
				$q->whereHas('course', function ($q) use ($teacher_id) {
					$q->where('teacher_id', $teacher_id);
				});
			}
		)->sum('file_size');

		return inertia('dashboard', [
			'total_courses' => $total_courses,
			'total_subscriptions' => $total_subscriptions,
			'total_lectures' => $total_lectures,
			'total_file_size' => $total_file_size
		]);
	}

	public function subscriptions(Request $request)
	{
		$teacher_id = auth('teacher')->id();
		$search = $request->query('search');
		$subscriptions = CourseSubscription::whereHas(
			'course',
			function ($q) use ($teacher_id) {
				$q->where('teacher_id', $teacher_id);
			}
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

		return inertia('subscriptions', [
			'subscriptions' => $subscriptions
		]);
	}
}
