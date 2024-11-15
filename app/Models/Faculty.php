<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Support\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Faculty extends Model
{
	use HasFactory;
	protected $fillable = ['name', 'city'];

	public function users()
	{
		return $this->hasMany(User::class, 'faculty_id', 'id');
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
