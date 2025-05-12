<?php

class Cell {
    
    private string $joint;
    private string $thickness;

    private array $samples = [];

    public function __construct(string $joint, string $thickness) {
        $this->joint = $joint;
        $this->thickness = $thickness;
    }

    public function getJoint(): string {
        return $this->joint;
    }

    public function getThickness(): string {
        return $this->thickness;
    }

    public function getKey(): string {
        return "{$this->joint}_{$this->thickness}";
    }

    public function add(Data $data): void {
        $this->samples[] = $data;
    }

    public function isEmpty(): bool {
        return empty($this->samples);
    }

    public function render(string $cellId): string {
        $html = "<td id=\"$cellId\" onclick=\"handleCellClick(this)\">";

        foreach ($this->samples as $index => $sample) {
            $html .= $sample->render($index);
        }

        $html .= "</td>";
        return $html;
    }
}
