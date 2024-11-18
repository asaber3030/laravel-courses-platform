<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class FileController extends Controller
{
	public function serve_file(string $file)
	{
		$path = public_path('uploads/courses_images/' . $file);
		return response()->file($path);
	}
}
