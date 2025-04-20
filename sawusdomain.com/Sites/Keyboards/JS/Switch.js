class Switch {

  string_type;
  int_weight;
  bool_isClicky;
  bool_isSilent;
  array_distance = [];
  array_force = [];

  constructor(new_type, new_weight, new_isClicky, new_isSilent, new_distance = [], new_force = []) {
    this.string_type = new_type;
    this.int_weight = new_weight;
    this.bool_isClicky = new_isClicky;
    this.bool_isSilent = new_isSilent;
    this.array_distance = new_distance;
    this.array_force = new_force;
  }


}
