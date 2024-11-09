<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Course extends Model
{

  use SoftDeletes;

  protected $table = 'courses';
  protected $fillable = ['title', 'description', 'price', 'image', 'teacher_id'];

  public function ratings()
  {
    return $this->hasMany(CourseRating::class, 'course_id', 'id');
  }
}
