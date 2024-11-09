<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CourseLecture extends Model
{
  protected $table = 'course_lectures';
  protected $fillable = ['course_id', 'title', 'order'];

  public function items()
  {
    return $this->hasMany(LectureItem::class, 'lecture_id', 'id');
  }
}
