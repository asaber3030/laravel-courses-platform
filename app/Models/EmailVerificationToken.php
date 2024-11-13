<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class EmailVerificationToken extends Model
{

	public $timestamps = false;

	protected $fillable = ['email', 'token'];
}
