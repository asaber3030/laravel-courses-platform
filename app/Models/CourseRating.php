<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Support\Carbon;

class CourseRating extends Model
{
	protected $table = 'course_ratings';
	protected $fillable = ['course_id', 'user_id', 'rating'];

	public function course()
	{
		return $this->belongsTo(Course::class, 'course_id', 'id');
	}

	public function user()
	{
		return $this->belongsTo(User::class, 'user_id', 'id');
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
