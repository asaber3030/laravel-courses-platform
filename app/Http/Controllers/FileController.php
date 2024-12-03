<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class FileController extends Controller
{

	public function uploads_view()
	{
		return inertia('uploader');
	}

	public function handle_upload(Request $request)
	{
		if ($request->hasFile('file')) {
			$file = $request->file('file');
			$filePath = $file->store('uploads', 'public'); // Save file to storage
			return response()->json(['path' => $filePath], 200);
		}

		return response()->json(['error' => 'File upload failed'], 400);
	}

	public function serve_file(string $file)
	{
		$path = public_path('uploads/courses_images/' . $file);
		return response()->file($path);
	}
}
