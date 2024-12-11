<?php

namespace App\Http\Controllers;

use App\Models\CourseSubscription;
use Illuminate\Http\Request;
use App\Models\Course;
use App\Models\CourseLecture;
use App\Models\User;
use App\Models\CourseRating;


class CourseController extends Controller
{
	public function index(Request $request)
	{

		$courses = Course::where([
			['teacher_id', auth('teacher')->id()],
			['title', 'LIKE', '%' . $request->query('search') . '%']
		])
			->orderBy('id', 'desc')
			->withCount('ratings')
			->withCount('subscriptions')
			->paginate();
		return inertia('courses/list', [
			'courses' => $courses
		]);
	}

	public function view(Course $course)
	{
		return inertia('courses/view', [
			'course' => $course->withCount('subscriptions')->where('id', $course->id)->first(),
			'lectures' => CourseLecture::where('course_id', $course->id)->orderBy('order', 'desc')->with('items')->get(),
			'subscriptions' => CourseSubscription::where('course_id', $course->id)->with('user', 'course')->take(10)->get()
		]);
	}

	public function ratings_view(Course $course)
	{
		$ratings = CourseRating::where('course_id', $course->id)->with('user')->get();

		return inertia('courses/ratings', [
			'ratings' => $ratings,
			'course' => $course
		]);
	}

	public function quick_activate_action(Request $request, Course $course)
	{
		$request->validate([
			'phone' => 'required|string|regex:/^01[0-2]\d{1,8}$/'
		]);

		$phone = $request->input('phone');
		$user = User::where('phone', $phone)->exists();

		if (!$user) {
			session()->flash('message', 'المستخدم غير موجود');
			session()->flash('type', 'error');
			return back();
		}

		$final = User::where('phone', $phone)->first();

		$findSubscription = CourseSubscription::where('course_id', $course->id)
			->where('user_id', $final->id)
			->exists();
		if ($findSubscription) {
			session()->flash('message', 'المستخدم مشترك بالفعل');
			session()->flash('type', 'error');
			return back();
		}

		CourseSubscription::create([
			'course_id' => $course->id,
			'user_id' => $final->id,
			'status' => 'active'
		]);

		session()->flash('message', 'تم تفعيل الاشتراك بنجاح للمستخدم ' . $final->name);
		return to_route('courses.subscriptions.view', ['course' => $course->id]);
	}

	public function create_view()
	{
		return inertia('courses/create');
	}

	public function create_action(Request $request)
	{
		$request->validate([
			'title' => 'required|string',
			'description' => 'required|string',
			'price' => 'required|numeric|gt:0',
			'image' => 'nullable|file|mimes:jpeg,jpg,png,gif|max:10000',
			'image.*' => 'nullable|mimes:pdf,csv,xlsx,png,jpg,jpeg'
		]);

		global $file_name;

		if ($request->hasFile('image')) {
			$unique_file_name = time() . '_' . uniqid() . '.' . $request->file('image')->getClientOriginalExtension();
			$file_name = '/' . $request->file('image')->move('uploads/courses_images', $unique_file_name);
		}

		auth('teacher')->user();

		Course::create([
			'title' => $request->input('title'),
			'price' => $request->input('price'),
			'description' => $request->input('description'),
			'image' => $file_name ? config('app.url') . $file_name : config('app.url') . '/maths.jpg',
			'teacher_id' => auth('teacher')->user()->getAuthIdentifier()
		]);

		session()->flash('message', 'تم اضافة الكورس بنجاح');
		return to_route('courses.list');
	}
	public function update_view(Course $course)
	{
		return inertia('courses/update', [
			'course' => $course
		]);
	}

	public function update_action(Request $request, Course $course)
	{
		$request->validate([
			'title' => 'required|string',
			'description' => 'required|string',
			'price' => 'required|numeric|gt:0',
			'image' => 'nullable|file|mimes:jpeg,jpg,png,gif|max:10000',
			'image.*' => 'nullable|mimes:pdf,csv,xlsx,png,jpg,jpeg'
		]);

		global $file_name;

		if ($request->hasFile('image')) {
			$unique_file_name = time() . '_' . uniqid() . '.' . $request->file('image')->getClientOriginalExtension();
			$file_name = '/' . $request->file('image')->move('uploads/courses_images', $unique_file_name);
		}

		auth('teacher')->user();
		Course::where('id', $course->id)->update([
			'title' => $request->input('title'),
			'price' => $request->input('price'),
			'description' => $request->input('description'),
			'image' => $file_name ? config('app.url') . $file_name : $course->image,
		]);

		session()->flash('message', 'تم تحديث الكورس بنجاح');
		return to_route('courses.list');
	}

	public function delete_action(Request $request, Course $course)
	{
		$course->delete();
		session()->flash('message', 'تم حذف الكورس بنجاح');
		return to_route('courses.list');
	}
}
