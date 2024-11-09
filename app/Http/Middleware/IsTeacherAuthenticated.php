<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class IsTeacherAuthenticated
{
	/**
	 * Handle an incoming request.
	 *
	 * @param  \Illuminate\Http\Request  $request
	 * @param  \Closure  $next
	 * @return \Symfony\Component\HttpFoundation\Response
	 */
	public function handle(Request $request, Closure $next): Response
	{
		// Check if the user is authenticated with the 'teacher' guard
		if (!Auth::guard('teacher')->check()) {
			// Redirect to the teacher login page if not authenticated
			return redirect()->route('teacher.login');
		}

		return $next($request);
	}
}
