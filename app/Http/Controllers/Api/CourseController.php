<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Course;
use App\Models\CourseLecture;
use App\Models\CourseSubscription;
use App\Models\LectureItem;
use Illuminate\Support\Facades\Auth;

class CourseController extends Controller
{
	public function subscribed_courses()
	{
		$user = Auth::user();
		$courses = CourseSubscription::where('user_id', $user->getAuthIdentifier())
			->whereHas('course', function ($q) {
				$q->whereNull('deleted_at');
			})
			->with('course')
			->simplePaginate();
		return response()->json([
			'message' => 'Subscribed Courses',
			'data' => $courses
		]);
	}

	public function get_course(Course $course)
	{
		$data = Course::withCount('ratings', 'lectures')->with('lectures')->where('id', $course->id)->first();
		$subscription = CourseSubscription::is_subscription_exists($course->id, Auth::id());
		if (!$subscription) {
			return response()->json(['message' => 'انت لست مشترك في هذا الكورس'], 403);
		}
		return response()->json([
			'message' => 'Course Data',
			'data' => $data
		]);
	}

	public function get_course_ratings(Course $course)
	{
		$ratings = $course->ratings()->with('user')->get();
		return response()->json([
			'message' => 'Course Ratings',
			'data' => $ratings
		]);
	}

	public function course_lectures(Course $course)
	{
		$subscription = CourseSubscription::is_subscription_exists($course->id, Auth::id());
		if (!$subscription) {
			return response()->json(['message' => 'انت لست مشترك في هذا الكورس'], 403);
		}
		$lectures = CourseLecture::where('course_id', $course->id)->with('items')->withCount('items')->get();
		return response()->json([
			'message' => 'Course Lectures',
			'data' => $lectures
		]);
	}

	public function view_lecture(Course $course, CourseLecture $lecture)
	{
		if ($lecture->course_id != $course->id) {
			return response()->json(['message' => 'هذا العنصر لا ينتمي لهذا الكورس'], 403);
		}
		$data = CourseLecture::with('items')->where('id', $lecture->id)->first();
		return response()->json([
			'message' => 'Lecture Data',
			'data' => $data
		]);
	}

	public function lecture_items(Course $course, CourseLecture $lecture)
	{
		if ($lecture->course_id != $course->id) {
			return response()->json(['message' => 'هذا العنصر لا ينتمي لهذا الكورس'], 403);
		}
		$items = LectureItem::where('lecture_id', $lecture->id)->get();
		return response()->json([
			'message' => 'Lecture Items',
			'data' => $items
		]);
	}

	public function view_item(Course $course, CourseLecture $lecture, LectureItem $item)
	{
		$data = LectureItem::where('id', $item->id)->first();
		if ($lecture->id != $data->lecture_id) {
			return response()->json(['message' => 'هذا العنصر لا ينتمي لهذا الدرس'], 403);
		}
		if ($lecture->course_id != $course->id) {
			return response()->json(['message' => 'هذا العنصر لا ينتمي لهذا الكورس'], 403);
		}
		return response()->json([
			'message' => 'Item Data',
			'data' => $data
		]);
	}
}
