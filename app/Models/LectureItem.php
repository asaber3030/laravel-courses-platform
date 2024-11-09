<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class LectureItem extends Model
{
	protected $table = 'lecture_items';
	protected $fillable = ['lecture_id', 'title', 'file', 'file_type', 'file_size', 'video_duration', 'order', 'is_active'];

	public function lecture()
	{
		return $this->belongsTo(CourseLecture::class, 'lecture_id', 'id');
	}
}
