<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\LectureItem;
use App\Models\Course;
use App\Models\CourseLecture;

class LectureItemController extends Controller
{
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
		$file->move('uploads/lectures_items', $unique_file_name);

		LectureItem::create([
			'title' => $request->input('title'),
			'file' => config('app.url') . $file_name,
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
			'file' => $file_name ? config('app.url') . $file_name : $item->file,
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
