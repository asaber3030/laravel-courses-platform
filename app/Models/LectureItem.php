<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Support\Carbon;

class LectureItem extends Model
{
	protected $table = 'lecture_items';
	protected $fillable = ['lecture_id', 'title', 'file', 'file_type', 'file_size', 'video_duration', 'order', 'is_active'];

	public function lecture()
	{
		return $this->belongsTo(CourseLecture::class, 'lecture_id', 'id');
	}
	public function createdAt(): Attribute
	{
		return Attribute::make(
			get: fn($value) => Carbon::parse($value)->diffForHumans()
		);
	}

	public function updatedAt(): Attribute
	{
		return Attribute::make(
			get: fn($value) => Carbon::parse($value)->diffForHumans()
		);
	}
}
