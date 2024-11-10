<?php

namespace Database\Factories;

use App\Models\CourseLecture;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\LectureItem>
 */
class LectureItemFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'lecture_id' => $this->faker->numberBetween(1, CourseLecture::count()),
            'title' => $this->faker->text(50),
            'file' => $this->faker->imageUrl(),
            'file_type' => $this->faker->fileExtension(),
            'file_size' => $this->faker->numberBetween(1, 200),
            'video_duration' => $this->faker->numberBetween(1, 200),
            'order' => $this->faker->numberBetween(1, 200),
            'is_active' => $this->faker->boolean(),
        ];
    }
}
