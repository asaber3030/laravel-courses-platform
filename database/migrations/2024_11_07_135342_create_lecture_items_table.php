<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
  /**
   * Run the migrations.
   */
  public function up(): void
  {
    Schema::create('lecture_items', function (Blueprint $table) {
      $table->id();
      $table->foreignId('lecture_id')->references('id')->on('course_lectures')->cascadeOnDelete();
      $table->string('title');
      $table->string('file');
      $table->string('file_type');
      $table->string('file_size');
      $table->integer('video_duration')->nullable();
      $table->integer('order');
      $table->boolean('is_active')->default(true);
      $table->softDeletes();
      $table->timestamps();
    });
  }

  /**
   * Reverse the migrations.
   */
  public function down(): void
  {
    Schema::dropIfExists('lecture_items');
  }
};
