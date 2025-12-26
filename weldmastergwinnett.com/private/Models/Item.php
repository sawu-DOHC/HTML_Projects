<?php

class Item {

    public int $id;
    public string $category;
    public string $description;
    public string $part_number;
    public int $quantity_on_hand;
    public string $last_updated;

    public function __construct(array $data) {
        $this->id               = (int)$data['id'];
        $this->category         = (string)$data['category'];
        $this->description      = (string)$data['description'];
        $this->part_number      = (string)$data['part_number'];
        $this->quantity_on_hand = (int)$data['quantity_on_hand'];
        $this->last_updated     = (string)$data['last_updated'];
    }

    public function renderRow(): string {
        $id   = htmlspecialchars((string)$this->id);
        $cat  = htmlspecialchars($this->category);
        $desc = htmlspecialchars($this->description);
        $part = htmlspecialchars($this->part_number);
        $qty  = htmlspecialchars((string)$this->quantity_on_hand);
        $date = htmlspecialchars($this->last_updated);
    
        return "
        <tr data-cat='{$cat}' onclick='viewPart.php({$id})'>
    
            <td data-label='ID'>{$id}</td>
    
            <td data-label='Description'>{$desc}</td>
    
            <td data-label='Part Number'>{$part}</td>
    
            <td data-label='QOH'>{$qty}</td>
    
            <td data-label='Category'>{$cat}</td>
    
            <td data-label='Last Updated'>{$date}</td>
    
            <td data-label='Add' class='actions'>
                <button class='buttonGreen' onclick='event.stopPropagation(); addToCart({$id})'>+</button>
            </td>
    
        </tr>";
    }


}
