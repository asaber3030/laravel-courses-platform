<?php

namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Storage;

class ProcessUploadedFile implements ShouldQueue
{
	use Queueable, SerializesModels, Dispatchable, InteractsWithQueue;

	protected $chunk;
	protected $chunkIndex;
	protected $totalChunks;
	protected $fileName;

	public function __construct($chunk, $chunkIndex, $totalChunks, $fileName)
	{
		$this->chunk = $chunk;
		$this->chunkIndex = $chunkIndex;
		$this->totalChunks = $totalChunks;
		$this->fileName = $fileName;
	}

	public function handle()
	{
		$filePath = storage_path("app/uploads/{$this->fileName}");
		file_put_contents($filePath, $this->chunk, FILE_APPEND);
		if ($this->chunkIndex === $this->totalChunks - 1) {
			$this->processFile($filePath);
		}
	}

	protected function processFile($filePath) {}
}
