<?php

class DBO_inventory {

    private PDO $pdo;

    public function __construct(PDO $pdo) {
        $this->pdo = $pdo;
    }

    // === CREATE ===
    public function createItem(array $data): int {
        $sql = "
            INSERT INTO inventory (category, description, part_number, quantity_on_hand)
            VALUES (:category, :description, :part_number, :quantity_on_hand)
        ";
        $stmt = $this->pdo->prepare($sql);
        $stmt->bindValue(':category', $data['category']);
        $stmt->bindValue(':description', $data['description']);
        $stmt->bindValue(':part_number', $data['part_number']);
        $stmt->bindValue(':quantity_on_hand', (int)$data['quantity_on_hand']);
        if (!$stmt->execute()) {
            $err = $stmt->errorInfo();
            throw new RuntimeException("[DBO_inventory] Insert failed: {$err[2]}");
        }
        return (int)$this->pdo->lastInsertId();
    }

    // === READ ===
    public function readAll(): array {
        $sql = "SELECT * FROM inventory ORDER BY category, description ASC";
        $stmt = $this->pdo->query($sql);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function readById(int $id): ?array {
        $sql = "SELECT * FROM inventory WHERE id = :id";
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute(['id' => $id]);
        $row = $stmt->fetch(PDO::FETCH_ASSOC);
        return $row ?: null;
    }

    public function readCategories(): array {
        $query = "SELECT category FROM inventory";
        $rows = $this->pdo->query($query)->fetchAll(PDO::FETCH_COLUMN);
    
        $uniqueCategories = [];
    
        foreach ($rows as $row) {
            $parts = explode(',', $row);
            foreach ($parts as $category) {
                $category = trim($category);
                if ($category === '') continue;
                if (!in_array($category, $uniqueCategories, true)) {
                    $uniqueCategories[] = $category;
                }
            }
        }
    
        return $uniqueCategories;
    }






    // === UPDATE ===
    public function updateQuantity(int $id, int $newQty): bool {
        $sql = "
            UPDATE inventory
            SET quantity_on_hand = :quantity_on_hand,
                last_updated = CURRENT_TIMESTAMP
            WHERE id = :id
        ";
        $stmt = $this->pdo->prepare($sql);
        return $stmt->execute([
            'quantity_on_hand' => $newQty,
            'id' => $id
        ]);
    }

    public function updateItem(int $id, array $data): bool {
        $sql = "
            UPDATE inventory
            SET category = :category,
                description = :description,
                part_number = :part_number,
                quantity_on_hand = :quantity_on_hand,
                last_updated = CURRENT_TIMESTAMP
            WHERE id = :id
        ";
        $stmt = $this->pdo->prepare($sql);
        return $stmt->execute([
            'category' => $data['category'],
            'description' => $data['description'],
            'part_number' => $data['part_number'],
            'quantity_on_hand' => $data['quantity_on_hand'],
            'id' => $id
        ]);
    }

    // === DELETE ===
    public function deleteItem(int $id): bool {
        $sql = "DELETE FROM inventory WHERE id = :id";
        $stmt = $this->pdo->prepare($sql);
        return $stmt->execute(['id' => $id]);
    }
}
