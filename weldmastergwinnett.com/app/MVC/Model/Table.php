<?php
class Table {
    
    private string $process;
    private string $material;
    private array $grid = [];

    public function __construct(string $process, string $material, array $joints, array $thicknesses) {
        $this->process = $process;
        $this->material = $material;

        // Pre-fill every non-header cell with an empty Cell
        foreach ($thicknesses as $t) {
            $thick = $t['thickness_value'];
            $this->grid[$thick] = [];

            foreach ($joints as $j) {
                $joint = $j['joint_name'];
                $this->grid[$thick][$joint] = new Cell($joint, $thick);
            }
        }
    }

    public function addSample(Data $data): void {
        $joint     = $data->joint_name;
        $thickness = $data->thickness_value;

        $this->grid[$thickness][$joint]->add($data);
    }

    public function render(array $joints, array $thicknesses): string {
        ob_start();

        echo "<table>";
        echo "<colgroup><col class=\"axis-col\">";
        foreach ($joints as $_) echo "<col>";
        echo "</colgroup>";

        echo "<thead><tr><th></th>";
        foreach ($joints as $j) echo "<th>{$j['joint_name']}</th>";
        echo "</tr></thead>";

        echo "<tbody>";
        foreach ($thicknesses as $t) {
            $thick = $t['thickness_value'];
            echo "<tr><td>{$thick}</td>";

            foreach ($joints as $j) {
                $joint = $j['joint_name'];
                $cellId = "{$this->process}_{$this->material}_{$joint}_{$thick}";

                echo $this->grid[$thick][$joint]->render($cellId);
            }

            echo "</tr>";
        }
        echo "</tbody></table>";

        return ob_get_clean();
    }
}
