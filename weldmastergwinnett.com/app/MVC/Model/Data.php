<?php

class Data {
    public int $sample_id;
    public string $process_name;
    public string $material_name;
    public string $joint_name;
    public string $thickness_value;

    public string $img_src;
    public string $thumb_src;
    public string $welder_name;
    public string $description;

    public string $amperage;
    public string $voltage;
    public string $frequency;
    public string $balance;
    public string $duration;
    public string $wire_feed_speed;
    public string $filler_diameter;
    public string $gas_type;
    public string $gas_flow_rate;
    public string $polarity;

    public function __construct(array $row) {
        $this->sample_id        = (int)$row['sample_id'];
        $this->process_name     = $row['process_name'];
        $this->material_name    = $row['material_name'];
        $this->joint_name       = $row['joint_name'];
        $this->thickness_value  = $row['thickness_value'];

        $this->img_src          = $row['img_src'];
        $this->thumb_src        = $row['thumb_src'];
        $this->welder_name      = $row['welder_name'];
        $this->description      = $row['description'];

        $this->amperage         = $row['amperage'];
        $this->voltage          = $row['voltage'];
        $this->frequency        = $row['frequency'];
        $this->balance          = $row['balance'];
        $this->duration         = $row['duration'];
        $this->wire_feed_speed  = $row['wire_feed_speed'];
        $this->filler_diameter  = $row['filler_diameter'];
        $this->gas_type         = $row['gas_type'];
        $this->gas_flow_rate    = $row['gas_flow_rate'];
        $this->polarity         = $row['polarity'];
    }

    public function render(int $index = 0): string {
        $altText = "{$this->welder_name} welding on {$this->material_name}, joint: {$this->joint_name}, thickness: {$this->thickness_value}";

        $structuredData = json_encode([
            "@context" => "https://schema.org",
            "@type" => "ImageObject",
            "name" => "Weld Sample {$this->sample_id}",
            "description" => "Welding sample using {$this->process_name} on {$this->material_name}, joint type {$this->joint_name}, thickness {$this->thickness_value}, by welder {$this->welder_name}.",
            "contentUrl" => "https://weldmastergwinnett.com/{$this->img_src}",
            "thumbnailUrl" => "https://weldmastergwinnett.com/{$this->thumb_src}",
            "creator" => [
                "@type" => "Person",
                "name" => $this->welder_name
            ],
            "keywords" => "{$this->process_name}, {$this->material_name}, welding sample, {$this->joint_name}, Gwinnett"
        ], JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);

        return <<<HTML
            <img 
                src="{$this->thumb_src}" 
                class="stacked-thumb" 
                data-index="{$index}" 
                alt="{$altText}"
            >
            <div class="weld-info">
                Welder: {$this->welder_name}<br>
                Email: info@weldmaster.com
            </div>
            <script type="application/ld+json">{$structuredData}</script>
        HTML;
}



}
