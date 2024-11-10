<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\CourseLecture>
 */
class CourseLectureFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'course_id' => $this->faker->randomNumber(1000),
            'title' => $this->faker->sentence,
            'order' => $this->faker->randomNumber(1000),
        ];
    }
}
