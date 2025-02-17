CREATE TABLE `Items Table` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `category` VARCHAR(100) NOT NULL,
    `description` VARCHAR(255) NOT NULL,
    `part_number` VARCHAR(100) NOT NULL,
    `quantity_on_hand` INT DEFAULT 0,
    `last_updated` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);





INSERT INTO `Items Table` (`category`, `description`, `part_number`, `quantity_on_hand`) VALUES

('PPE', 'Gloves mig tillman SMALL', '1540S', 0),
('PPE', 'Gloves mig tillman MEDIUM', '1540M', 0),
('PPE', 'Gloves mig tillman LARGE', '1540L', 0),
('PPE', 'Gloves mig tillman EXTRA LARGE', '1540XL', 0),
('PPE', 'Gloves tig tillman SMALL', '24cs', 0),
('PPE', 'Gloves tig tillman MEDIUM', '24cm', 0),
('PPE', 'Gloves tig tillman LARGE', '24cl', 0),
('PPE', 'Gloves tig tillman EXTRA LARGE', '24cxl', 0),

('PPE', 'FR jacket small', 'SM-6230S', 0),
('PPE', 'FR jacket medium', 'MD-6230M', 0),
('PPE', 'FR jacket large', 'LG-6230L', 0),
('PPE', 'FR jacket extra large', 'XL-6230XL', 0),
('PPE', 'FR jacket 2x large', 'XL-62302X', 0),

('PPE', 'Blue girls jacket EXTRA SMALL', 'REVJH1515-NB-XS', 0),
('PPE', 'Blue/Black leather jacket SMALL', 'JL1030BB-S', 0),
('PPE', 'Blue/Black leather jacket MEDIUM', 'JL1030BB-M', 0),
('PPE', 'Blue/Black leather jacket LARGE', 'JL1030BB-L', 0),
('PPE', 'Blue/Black leather jacket EXTRA LARGE', 'JL1030BB-XL', 0),
('PPE', 'Blue/Black leather jacket 2XL', 'JL1030BB-2X', 0),
('PPE', 'Yellow leather jacket 3XL', 'JL1030BB-3X', 0),

('PPE', '3M Respirator filter', '2091 P100', 0),

('PPE', 'Ear plugs 3M', '1110', 0);



INSERT INTO `Items Table` (`category`, `description`, `part_number`, `quantity_on_hand`) VALUES
('MIG', 'Contact Tip .035', '403-20-35', 0),
('MIG', 'Contact Tip .045', '403-20-45', 0),
('MIG', 'Diffuser (Tregaskiss)', '404-26', 0),
('MIG', 'Felt Wire Lube (Lube Matic)', '0070660', 0),
('MIG', 'Miller Briefcase Wire Guide', '150994', 0),
('MIG', 'Drive Roller', '189285', 0),
('MIG', 'Mig Gun Insulator', '4532R', 0),
('MIG', 'Nozzle Short Circuit', '401-42-50', 0),
('MIG', 'Nozzle Spray Transfer', '401-7-62', 0),
('MIG', 'Nozzle HD Copper', '401-48-62', 0),
('MIG', 'Replacement MIG guns', 'Q3010AR3EMC', 0),
('MIG', 'MIG Filler .045"', 'ER70S-6', 0),
('MIG', 'MIG Filler .035"', 'ER70S-6', 0);

INSERT INTO `Items Table` (`category`, `description`, `part_number`, `quantity_on_hand`) VALUES
('TIG', 'CK Torch Insulator (trailing)', '', 0),
('TIG', 'Torch (Miller)', '', 0),
('TIG', 'Miller Torch Insulator (leading)', '', 0),
('TIG', 'Miller Torch Insulator (trailing)', '', 0),
('TIG', 'Gas Lens 1/16', '', 0),
('TIG', 'Gas Lens 3/32', '', 0),
('TIG', 'Gas Lens 1/8', '', 0),
('TIG', 'Cup #4', '', 0),
('TIG', 'Cup #5', '', 0),
('TIG', 'Cup #6', '', 0),
('TIG', 'Cup #7', '', 0),
('TIG', 'Cup #8', '', 0),
('TIG', 'Back Cap Small', '', 0),
('TIG', 'Back Cap Medium', '', 0),
('TIG', 'Back Cap Large', '', 0),
('TIG', 'Collet 1/16', '', 0),
('TIG', 'Collet 3/32', '', 0),
('TIG', 'Collet 1/8', '', 0),
('TIG', 'Collet Body 1/16', '', 0),
('TIG', 'Collet Body 3/32', '', 0),
('TIG', 'Collet Body 1/8', '', 0),
('TIG', 'Foot Pedal', '', 0),
('TIG', '1/16 tungsten ceriated', 'T1167GC2', 0),
('TIG', '3/32 tungsten ceriated', 'T3327GC2', 0),
('TIG', '1/8 tungsten ceriated', 'T187GC2', 0),
('TIG', 'Aluminium Filler .045"', 'ER4043', 0),
('TIG', 'Aluminium Filler 1/16"', 'ER4043', 0),
('TIG', 'Aluminium Filler 3/32"', 'ER4043', 0),
('TIG', 'Aluminium Filler 1/8"', 'ER4043', 0),
('TIG', 'Stainless Steel Filler .045"', '308L', 0),
('TIG', 'Stainless Steel Filler 1/16"', '308L', 0),
('TIG', 'Stainless Steel Filler 3/32"', '308L', 0),
('TIG', 'Stainless Steel Filler 1/8"', '308L', 0),
('TIG', 'Mild Steel Filler .035"', 'ER70S-2', 0),
('TIG', 'Mild Steel Filler .045"', 'ER70S-2', 0),
('TIG', 'Mild Steel Filler 1/16"', 'ER70S-2', 0),
('TIG', 'Mild Steel Filler 3/32"', 'ER70S-2', 0),
('TIG', 'Mild Steel Filler 1/8"', 'ER70S-2', 0);


INSERT INTO `Items Table` (`category`, `description`, `part_number`, `quantity_on_hand`) VALUES
('Stick', 'Stinger Replacement', 'ARC-532', 0);

INSERT INTO `Items Table` (`category`, `description`, `part_number`, `quantity_on_hand`) VALUES
('Oxy Fuel', 'Propane Nozzle 00', '1501210', 0),
('Oxy Fuel', 'Propane Nozzle 0', '1501220', 0),
('Oxy Fuel', 'Propane Nozzle 1', '1501230', 0),
('Oxy Fuel', 'Propane Nozzle 2', '1501240', 0),
('Oxy Fuel', 'Acetylene Nozzle 00', '000-1-101', 0),
('Oxy Fuel', 'Acetylene Nozzle 0', '00-1-101', 0),
('Oxy Fuel', 'Acetylene Nozzle 0', '0-1-101', 0),
('Oxy Fuel', 'Acetylene Nozzle 1', '1-1-101', 0),
('Oxy Fuel', 'Acetylene Nozzle 2', '2-1-101', 0),
('Oxy Fuel', 'Acetylene Track Torch 00', '6290-2/0', 0),
('Oxy Fuel', 'Acetylene Track Torch 0', '6290-1', 0),
('Oxy Fuel', 'Acetylene Track Torch 1', '6290-1', 0),
('Oxy Fuel', 'Acetylene Track Torch 2', '6290-2', 0),
('Oxy Fuel', 'Torch Assembly', '62-5F (1003451)', 0),
('Oxy Fuel', 'Spare Hoses', '907-T254', 0),
('Oxy Fuel', 'Protective Sleeves Tillman', '582-025', 0),
('Oxy Fuel', 'Strikers (Lincoln)', 'KH572', 0),
('Oxy Fuel', 'Flint Replacements', '', 0),
('Oxy Fuel', 'Torch Tip Cleaners', '', 0),
('Oxy Fuel', 'Regulator Oxygen', '', 0),
('Oxy Fuel', 'Regulator Fuel', '', 0),
('Oxy Fuel', 'Quick Connect Oxygen', '', 0),
('Oxy Fuel', 'Quick Connect Fuel', '', 0),
('Oxy Fuel', 'Flashback Arrestor (Oxygen) Fuel Safe Western Enterprises', 'FA-30', 0),
('Oxy Fuel', 'Flashback Arrestor (Fuel) Fuel Safe Western Enterprises', '', 0),
('Oxy Fuel', '2pc Acetylene torches Harris lower', '315FC+', 0),
('Oxy Fuel', '2pc Acetylene torches Harris upper', 'CA2460+', 0),
('Oxy Fuel', 'Fluxed Wire for brazing Harris 3/32', '015FC50', 0);



INSERT INTO `Items Table` (`category`, `description`, `part_number`, `quantity_on_hand`) VALUES
('Plasma', 'Gouge Shield', 'HT220798', 0),
('Plasma', 'Gouge Nozzle', 'HT220797', 0),
('Plasma', 'Drag Shield', 'HT220818', 0),
('Plasma', 'Cut Nozzle', 'HT220819', 0),
('Plasma', 'Retaining Cap', 'HT220854', 0),
('Plasma', 'Swirl Ring', 'HT220857', 0),
('Plasma', 'Electrode', 'HT220842', 0);


INSERT INTO `Items Table` (`category`, `description`, `part_number`, `quantity_on_hand`) VALUES

('Carbon Arc Gouging', 'Carbon Arc Electrode Round 1/4"', '', 0),
('Carbon Arc Gouging', 'Carbon Arc Electrode Round 5/16"', 'Kp3800-5/16', 0),
('Carbon Arc Gouging', 'Carbon Arc Electrode Round 3/8"', '', 0),
('Carbon Arc Gouging', 'Carbon Arc Electrode Round 1/2"', '', 0),
('Carbon Arc Gouging', 'Carbon Arc Electrode Flat 1/4"', '', 0),
('Carbon Arc Gouging', 'Replacement Stinger', '', 0 );


INSERT INTO `Items Table` (`category`, `description`, `part_number`, `quantity_on_hand`) VALUES

('Raw Material', 'Mild Steel Sheet 4\' x 8\' Cold Rolled 1/16"', '', 0),
('Raw Material', 'Mild Steel Sheet 4\' x 8\' Cold Rolled 1/8"', '', 0),

('Raw Material', 'Mild Steel Sheet 4\' x 8\' Hot Rolled 1/16"', '', 0),
('Raw Material', 'Mild Steel Sheet 4\' x 8\' Hot Rolled 1/8"', '', 0),

('Raw Material', 'Stainless Sheet 4\' x 8\' 1/16"', '', 0),
('Raw Material', 'Stainless Sheet 4\' x 8\' 1/8"', '', 0),

('Raw Material', 'Aluminum Sheet 4\' x 8\' 1/16"', '', 0),
('Raw Material', 'Aluminum Sheet 4\' x 8\' 1/8"', '', 0),

('Raw Material', 'Merchant Bar 6\' x 20\' 1/4"', '', 0),
('Raw Material', 'Merchant Bar 6\' x 20\' 3/8"', '', 0),
('Raw Material', 'Merchant Bar 6\' x 20\' 1/2"', '', 0);


INSERT INTO `Items Table` (`category`, `description`, `part_number`, `quantity_on_hand`) VALUES
('Maintenance', 'Grinding Wheel', '', 0),
('Maintenance', 'Cutting disc', '', 0),
('Maintenance', 'Wire Wheel Brush', '', 0),
('Maintenance', 'Cup Wire Brush', '', 0),
('Maintenance', 'Flap Discs', '', 0),
('Maintenance', 'Pirranah Diamond Wheel Replacement', '', 0),
('Maintenance', 'Belt Sander Replacement Belt', '', 0),
('Maintenance', 'Stainless Steel Bristles', '', 0),
('Maintenance', 'Mild Steel Bristles', '', 0),
('Maintenance', 'Brass Bristles', '', 0),
('Maintenance', 'Dead-blow Hammer', '', 0),
('Maintenance', 'Baby Hammer', '', 0),
('Maintenance', 'Big Boy Hammer', '', 0),
('Maintenance', 'Big Kalamazoo Blade Fine', '', 0),
('Maintenance', 'Big Kalamazoo Blade Coarse', '', 0),
('Maintenance', 'Baby Kalamazoo Blade Fine', '', 0),
('Maintenance', 'Baby Kalamazoo Blade Coarse', '', 0), 
('Maintenance', 'Cooling Fan (Nu tone)', '', 0);
