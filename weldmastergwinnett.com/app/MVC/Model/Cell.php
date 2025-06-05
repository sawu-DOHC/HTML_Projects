<?php

class Cell {

    private string $x;      // joint
    private string $y;      // thickness
    private string $key;
    private array $data = [];

    private string $cellId;
    private int $index;
    private string $html;

    public function __construct(string $x, string $y) {
        $this->x = $x;
        $this->y = $y;
        $this->key = "{$x}_{$y}";
    }

    public function getX(): string {
        return $this->x;
    }

    public function getY(): string {
        return $this->y;
    }

    public function getKey(): string {
        return $this->key;
    }

    public function add(Data $datum): void {
        $this->data[] = $datum;
    }

    public function isEmpty(): bool {
        return empty($this->data);
    }

    public function render(string $cellId): string {
        $this->cellId = $cellId;
        $this->html = "<td id=\"$this->cellId\" onclick=\"handleCellClick(this)\">";

        foreach ($this->data as $this->index => $datum) {
            $this->html .= $datum->render($this->index);
        }

        $this->html .= "</td>";
        return $this->html;
    }
}
