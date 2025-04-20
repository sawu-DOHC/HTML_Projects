const milkyYellow = new Switch(
    "linear",
    45,
    false,
    false,
    // distance_array
    [0.0, 0.2, 0.4, 0.6, 0.8, 1.0, 1.2, 1.4, 1.6, 1.8, 2.0, 2.2, 2.4, 2.6, 2.8, 3.0, 3.2, 3.4, 3.6, 3.8, 4.0],
    // force_array
    [35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 45, 45, 45, 46, 47, 48, 49, 50, 51, 100]
  );
  
  const brown = new Switch(
    "tactile",
    50,
    false,
    false,
    [0.0, 0.2, 0.4, 0.6, 0.8, 1.0, 1.2, 1.4, 1.6, 1.8, 2.0, 2.2, 2.4, 2.6, 2.8, 3.0, 3.2, 3.4, 3.6, 3.8, 4.0],
    [20, 23, 26, 29, 32, 35, 38, 41, 44, 47, 50, 40, 37, 36, 35, 35, 35, 35, 35, 35, 100]
  );
  
  const babyKangaroo = new Switch(
    "heavy tactile",
    65,
    false,
    false,
    [0.0, 0.2, 0.4, 0.6, 0.8, 1.0, 1.2, 1.4, 1.6, 1.8, 2.0, 2.2, 2.4, 2.6, 2.8, 3.0, 3.2, 3.4, 3.48, 3.49, 3.5],
    [45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 60, 60, 60, 60, 100]
  );
  
  const green = new Switch(
    "clicky",
    50,
    true,
    false,
    [0.0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0, 1.2, 1.4, 1.6, 1.8, 2.0, 2.2, 2.4, 2.6, 2.8, 3.0, 3.2, 3.4, 3.6, 3.8, 4.0],
    [40, 45, 50, 55, 62, 65, 64, 62, 60, 58, 55, 50, 47, 45, 43, 42, 40, 39, 38, 37, 36, 35, 34, 34, 34, 100]
  );
  



  //constructor(
  // string_name, 
  // string_description, 
  // string_chasis, 
  // string_switchPlate,
  // double_mass, 
  // (obj_switch) 

  const keyboard_spring = new Keyboard(
    "Spring",
    "A lightweight keyboard with smooth, linear switches — fresh and responsive.",
    "polycarbonate",
    "aluminum",
    1.2,
    milkyYellow
  );
  
  const keyboard_summer = new Keyboard(
    "Summer",
    "A balanced keyboard with crisp tactile feedback — energetic and precise.",
    "aluminum",
    "brass",
    1.3,
    brown
  );
  
  const keyboard_autumn = new Keyboard(
    "Autumn",
    "A heavier keyboard with pronounced tactile response — deep and grounded.",
    "brass",
    "brass",
    1.4,
    green
  );
  
  const keyboard_winter = new Keyboard(
    "Winter",
    "A clicky keyboard with a sharp, cold snap — bold and assertive.",
    "steel",
    "aluminum",
    1.25,
    babyKangaroo
  );
  