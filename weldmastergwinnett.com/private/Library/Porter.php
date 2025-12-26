<?php

class Porter {
    private const QUALITY     = 85;
    private const WIDTH_THUMB = 600;
    private const FILE_PATH   = __DIR__ . '/../../public/Assets/Uploads/';

    public function __construct(PDO $pdo) {
        // PDO not needed here unless you want to log uploads later
    }

    public function transferFile(array &$input): void {
        error_log("[PORTER] Starting file transfer...");

        // === Step 1: early exit if no file ===
        if (empty($input['tmpPath']) || !is_uploaded_file($input['tmpPath'])) {
            error_log("[PORTER] No valid uploaded file. tmpPath: " . ($input['tmpPath'] ?? 'null'));
            $input['mediaSrc'] = null;
            $input['thumbSrc'] = null;
            return;
        }

        // === Step 2: normalize filenames and paths ===
        [$ext, $filename, $fullPath] = $this->prepareFileInfo(
            $input['originalName'] ?? 'upload'
        );

        error_log("[PORTER] File info prepared:");
        error_log("         - Extension: $ext");
        error_log("         - Filename: $filename");
        error_log("         - Full path: $fullPath");

        // === Step 3: process based on file type ===
        try {
            $thumbName = $this->processFile($ext, $input['tmpPath'], $fullPath, $filename);
        } catch (Throwable $e) {
            error_log("[PORTER] Error processing file: " . $e->getMessage());
            throw $e;
        }

        // === Step 4: update input ===
        $input['mediaSrc'] = $filename;
        $input['thumbSrc'] = $thumbName;

        error_log("[PORTER] Transfer complete. mediaSrc: $filename | thumbSrc: " . ($thumbName ?? 'null'));
    }

    private function prepareFileInfo(string $originalName): array {
        // normalize extension
        $ext = strtolower(pathinfo($originalName, PATHINFO_EXTENSION));
        if ($ext === 'jpeg') {
            $ext = 'jpg';
        }
    
        // generate unique base
        $timestamp = date('Ymd_His');
        $random    = bin2hex(random_bytes(4)); // 8 chars
        $filename  = "{$timestamp}_{$random}.{$ext}";
    
        $fullPath = self::FILE_PATH . $filename;
    
        return [$ext, $filename, $fullPath];
    }


    private function processFile(string $ext, string $tmpPath, string $fullPath, string $filename): ?string {
        error_log("[PORTER] Processing file type: $ext");

        switch ($ext) {
            case 'jpg':
                return $this->processJpeg($tmpPath, $fullPath, $filename);
            case 'png':
                return $this->processPng($tmpPath, $fullPath, $filename);
            case 'gif':
                return $this->processGif($tmpPath, $fullPath);
            case 'webm':
                return $this->processWebm($tmpPath, $fullPath);
            default:
                throw new RuntimeException("Unsupported file type: $ext");
        }
    }

    private function processJpeg(string $tmpPath, string $fullPath, string $filename): string {
        error_log("[PORTER] Saving JPEG to $fullPath");

        if (!move_uploaded_file($tmpPath, $fullPath)) {
            throw new RuntimeException("Failed to save JPEG upload.");
        }

        $thumbName = preg_replace('/(\.\w+)$/', '_thumb.jpg', $filename);
        $thumbPath = self::FILE_PATH . $thumbName;

        $srcImage = imagecreatefromstring(file_get_contents($fullPath));
        if ($srcImage === false) {
            throw new RuntimeException("Could not create JPEG image resource.");
        }

        $w = imagesx($srcImage);
        $h = imagesy($srcImage);
        error_log("[PORTER] JPEG dimensions: {$w}x{$h}");

        if ($w > self::WIDTH_THUMB) {
            $newW = self::WIDTH_THUMB;
            $newH = (int)($h * ($newW / $w));

            $resized = imagecreatetruecolor($newW, $newH);
            imagecopyresampled($resized, $srcImage, 0, 0, 0, 0, $newW, $newH, $w, $h);
            imagejpeg($resized, $thumbPath, self::QUALITY);
            imagedestroy($resized);

            error_log("[PORTER] Thumbnail resized to: {$newW}x{$newH}");
        } else {
            copy($fullPath, $thumbPath);
            error_log("[PORTER] Thumbnail is original size.");
        }

        imagedestroy($srcImage);

        return $thumbName;
    }

    private function processGif(string $tmpPath, string $fullPath): ?string {
        $size = filesize($tmpPath);
        error_log("[PORTER] GIF size: $size bytes");

        if ($size > 8 * 1024 * 1024) {
            throw new RuntimeException("GIF too large (max 8MB).");
        }

        if (!move_uploaded_file($tmpPath, $fullPath)) {
            throw new RuntimeException("Failed to save GIF upload.");
        }

        return null;
    }

    private function processWebm(string $tmpPath, string $fullPath): ?string {
        error_log("[PORTER] Saving WEBM to $fullPath");

        if (!move_uploaded_file($tmpPath, $fullPath)) {
            throw new RuntimeException("Failed to save WEBM upload.");
        }

        return null;
    }

    private function processPng(string $tmpPath, string $fullPath, string $filename): string {
        error_log("[PORTER] Saving PNG to $fullPath");
        
        if (!move_uploaded_file($tmpPath, $fullPath)) {
            throw new RuntimeException("Failed to save PNG upload.");
        }
    
        $thumbName = preg_replace('/(\.\w+)$/', '_thumb.png', $filename);
        $thumbPath = self::FILE_PATH . $thumbName;
    
        $srcImage = imagecreatefrompng($fullPath);
        if ($srcImage === false) {
            throw new RuntimeException("Could not create PNG image resource.");
        }
    
        $w = imagesx($srcImage);
        $h = imagesy($srcImage);
        error_log("[PORTER] PNG dimensions: {$w}x{$h}");
    
        if ($w > self::WIDTH_THUMB) {
            $newW = self::WIDTH_THUMB;
            $newH = (int)($h * ($newW / $w));
        
            $resized = imagecreatetruecolor($newW, $newH);
            imagealphablending($resized, false);
            imagesavealpha($resized, true);
            $transparent = imagecolorallocatealpha($resized, 0, 0, 0, 127);
            imagefill($resized, 0, 0, $transparent);
        
            imagecopyresampled($resized, $srcImage, 0, 0, 0, 0, $newW, $newH, $w, $h);
            imagepng($resized, $thumbPath, 6);
            imagedestroy($resized);
        
            error_log("[PORTER] Thumbnail resized to: {$newW}x{$newH}");
        } else {
            copy($fullPath, $thumbPath);
            error_log("[PORTER] Thumbnail is original size.");
        }
    
        imagedestroy($srcImage);
        return $thumbName;
}
}
