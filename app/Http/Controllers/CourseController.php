<?php

namespace App\Http\Controllers;

use App\Models\CourseSubscription;
use App\Models\LectureItem;
use Illuminate\Http\Request;
use App\Models\Course;
use App\Models\CourseLecture;
use App\Models\User;
use App\Models\CourseRating;

class CourseController extends Controller
{
	public function index(Request $request)
	{
		$search_param = $request->query('search');
		$user = auth('teacher')->user();
		$courses = Course::where('teacher_id', $user->getAuthIdentifier())
			->where('title', 'like', "%{$search_param}%")
			->orWhere('description', 'like', "%{$search_param}%")
			->orderBy('id', 'desc')
			->withCount('ratings')
			->paginate();
		return inertia('courses/list', [
			'courses' => $courses
		]);
	}

	public function view(Course $course)
	{
		return inertia('courses/view', [
			'course' => $course,
			'lectures' => CourseLecture::where('course_id', $course->id)->orderBy('order', 'desc')->with('items')->get(),
			'subscriptions' => CourseSubscription::where('course_id', $course->id)->with('user', 'course')->take(10)->get()
		]);
	}

	public function view_subscriptions(Course $course)
	{
		return inertia('courses/subscriptions', [
			'course' => $course,
			'subscriptions' => CourseSubscription::where('course_id', $course->id)->with('user', 'course')->paginate()
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

	// Create a new course
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
			'image' => $file_name ? $file_name : '/maths.jpg',
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
			'image' => $file_name ? $file_name : $course->image,
			'teacher_id' => auth('teacher')->user()->getAuthIdentifier()
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
	public function view_lecture_view(Course $course, CourseLecture $lecture)
	{
		$lectureWithItems = CourseLecture::where('id', $lecture->id)->with('items')->first();
		return inertia('courses/lectures/view', [
			'course' => $course,
			'lecture' => $lectureWithItems
		]);
	}
	# Lectures
	public function create_lecture_action(Request $request, Course $course)
	{
		$request->validate([
			'title' => 'required|string',
			'order' => 'required|numeric|gt:0',
		]);

		CourseLecture::create([
			'title' => $request->input('title'),
			'order' => $request->input('order'),
			'course_id' => $course->id
		]);

		session()->flash('message', 'تم اضافة المحاضرة بنجاح');
		return to_route('courses.view', ['course' => $course->id]);
	}

	public function update_lecture_action(Request $request, Course $course, CourseLecture $lecture)
	{
		$request->validate([
			'title' => 'required|string',
			'order' => 'required|numeric|gt:0',
		]);

		CourseLecture::where('id', $lecture->id)->update([
			'title' => $request->input('title'),
			'order' => $request->input('order'),
			'course_id' => $course->id
		]);

		session()->flash('message', 'تم تعديل المحاضرة بنجاح');
		return to_route('courses.view', ['course' => $course->id]);
	}

	public function delete_lecture_action(Request $request, Course $course, CourseLecture $lecture)
	{
		$lecture->delete();
		session()->flash('message', 'تم حذف المحاضرة بنجاح');
		return to_route('courses.view', ['course' => $course->id]);
	}

	public function create_item_view(Course $course, CourseLecture $lecture)
	{
		return inertia('courses/lectures/create-item', [
			'lecture' => $lecture
		]);
	}

	public function create_item_action(Request $request, Course $course, CourseLecture $lecture)
	{
		$request->validate([
			'title' => 'required|string|max:255|min:3',
			'file' => 'required|mimes:pdf,mp4,webm,ogg|max:512000',
			'order' => 'required|numeric|gt:0'
		]);

		$file = $request->file('file');
		$unique_file_name =  'omar_' . time() . '_' . uniqid() . '.' . $file->getClientOriginalExtension();
		$file_size = round($file->getSize() / 1048576, 2);
		$file_type = $file->getClientOriginalExtension() == 'pdf' ? 'pdf' : 'video';
		$file_name = '/uploads/lectures_items/' . $unique_file_name;

		LectureItem::create([
			'title' => $request->input('title'),
			'file' => $file_name,
			'order' => $request->input('order'),
			'lecture_id' => $lecture->id,
			'file_size' => $file_size,
			'file_type' => $file_type,
			'video_duration' => 10,
			'is_active' => true
		]);

		session()->flash('message', 'تم اضافة العنصر بنجاح');
		return to_route('courses.lectures.view', ['course' => $course->id, 'lecture' => $lecture->id]);
	}

	public function update_item_view(Course $course, CourseLecture $lecture, LectureItem $item)
	{
		return inertia('courses/lectures/update-item', [
			'lecture' => $lecture,
			'item' => $item,
		]);
	}


	public function update_item_action(Request $request, Course $course, CourseLecture $lecture, LectureItem $item)
	{
		$request->validate([
			'title' => 'nullable|string|max:255|min:3',
			'file' => 'nullable|mimes:pdf,mp4,webm,ogg|max:512000',
			'order' => 'nullable|numeric|gt:0'
		]);

		global $file_name;
		global $file_size;
		global $file_type;

		if ($request->hasFile('file')) {
			$file = $request->file('file');
			$unique_file_name =  'omar_' . time() . '_' . uniqid() . '.' . $file->getClientOriginalExtension();
			$file_size = round($file->getSize() / 1048576, 2);
			$file_type = $file->getClientOriginalExtension() == 'pdf' ? 'pdf' : 'video';
			$file_name = '/uploads/lectures_items/' . $unique_file_name;
		}

		LectureItem::where('id', $item->id)->update([
			'title' => $request->input('title'),
			'order' => $request->input('order'),
			'file' => $file_name ? $file_name : $item->file,
			'lecture_id' => $lecture->id,
			'file_size' => $file_size ? $file_size : $item->file_size,
			'file_type' => $file_type ? $file_type : $item->file_type,
			'video_duration' => 10,
			'is_active' => true
		]);

		session()->flash('message', 'تم اضافة العنصر بنجاح');
		return to_route('courses.lectures.view', ['course' => $course->id, 'lecture' => $lecture->id]);
	}

	public function delete_item_action(Request $request, Course $course, CourseLecture $lecture, LectureItem $item)
	{
		$item->delete();
		session()->flash('message', 'تم حذف العنصر بنجاح');
		return to_route('courses.lectures.view', ['course' => $course->id, 'lecture' => $lecture->id]);
	}
}
