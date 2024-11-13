<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Course;
use App\Models\CourseLecture;

class LectureController extends Controller
{
	public function view_lecture_view(Course $course, CourseLecture $lecture)
	{
		$lectureWithItems = CourseLecture::where('id', $lecture->id)->with('items')->first();
		return inertia('courses/lectures/view', [
			'course' => $course,
			'lecture' => $lectureWithItems
		]);
	}

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
}
