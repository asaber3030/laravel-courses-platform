<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Faculty;
use App\Models\Course;
use App\Models\Teacher;
use App\Models\CourseLecture;
use App\Models\CourseRating;
use App\Models\CourseSubscription;
use App\Models\LectureItem;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory()->count(50)->create();
        // Teacher::factory()->count(50)->create();
        // Course::factory()->count(50)->create();
        // CourseRating::factory()->count(100)->create();
        // CourseLecture::factory()->count(150)->create();
        // LectureItem::factory()->count(200)->create();
        // Faculty::factory()->count(10)->create();
        CourseSubscription::factory()->count(50)->create();
    }
}
