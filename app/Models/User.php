<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Support\Carbon;

class User extends Authenticatable
{
	use HasApiTokens, HasFactory, Notifiable;

	protected $fillable = [
		'faculty_id',
		'phone',
		'name',
		'email',
		'password',
	];

	protected $hidden = [
		'password',
		'remember_token',
	];

	protected function casts(): array
	{
		return [
			'email_verified_at' => 'datetime',
			'password' => 'hashed',
		];
	}

	public function faculty()
	{
		return $this->belongsTo(Faculty::class, 'faculty_id', 'id');
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
