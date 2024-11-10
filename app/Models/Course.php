<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Carbon;

class Course extends Model
{

  use SoftDeletes, HasFactory;

  protected $table = 'courses';
  protected $fillable = ['title', 'description', 'price', 'image', 'teacher_id'];

  public function ratings()
  {
    return $this->hasMany(CourseRating::class, 'course_id', 'id');
  }

  public function lectures()
  {
    return $this->hasMany(CourseLecture::class, 'course_id', 'id');
  }

  public function subscriptions()
  {
    return $this->hasMany(CourseSubscription::class, 'course_id', 'id');
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
