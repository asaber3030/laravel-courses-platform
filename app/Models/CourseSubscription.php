<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CourseSubscription extends Model
{
	protected $table = 'course_subscriptions';
	protected $fillable = ['course_id', 'user_id', 'status'];

	public function course()
	{
		return $this->belongsTo(Course::class, 'course_id', 'id');
	}

	public function user()
	{
		return $this->belongsTo(User::class, 'user_id', 'id');
	}
}
