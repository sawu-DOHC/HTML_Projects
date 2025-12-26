<?php
class Product {
    public string $name;
    public float $price;
    public string $image;
    public array $specs;

    public function __construct(string $name, float $price, string $image, array $specs = []) {
        $this->name  = $name;
        $this->price = $price;
        $this->image = $image;
        $this->specs = $specs;
    }

    // Inactive view: image + name only
    public function render(): string {
        return <<<HTML
        <article class="product inactive">
          <img src="{$this->image}" alt="{$this->name}">
          <h2>{$this->name}</h2>
        </article>
        HTML;
    }
}
