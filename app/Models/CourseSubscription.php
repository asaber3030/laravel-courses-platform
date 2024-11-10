<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Support\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class CourseSubscription extends Model
{
	use HasFactory;
	protected $table = 'course_subscriptions';
	protected $fillable = ['course_id', 'user_id', 'status'];

	public static function is_subscription_exists($course_id, $user_id)
	{
		return self::where('course_id', $course_id)->where('user_id', $user_id)->exists();
	}

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
