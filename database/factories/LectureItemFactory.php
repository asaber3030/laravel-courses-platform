<?php

namespace Database\Factories;

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
            'lecture_id' => $this->faker->randomNumber(1000),
            'title' => $this->faker->text(50),
            'file' => $this->faker->imageUrl(),
            'file_type' => $this->faker->fileExtension(),
            'file_size' => $this->faker->randomNumber(1000),
            'video_duration' => $this->faker->randomNumber(1000),
            'order' => $this->faker->randomNumber(1000),
            'is_active' => $this->faker->boolean(),
        ];
    }
}
