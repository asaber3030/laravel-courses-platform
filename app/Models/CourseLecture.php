<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Support\Carbon;

class CourseLecture extends Model
{
  protected $table = 'course_lectures';
  protected $fillable = ['course_id', 'title', 'order'];

  public function items()
  {
    return $this->hasMany(LectureItem::class, 'lecture_id', 'id');
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
