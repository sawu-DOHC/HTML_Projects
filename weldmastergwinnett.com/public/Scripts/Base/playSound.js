function playSound(type) {
  let filename = "";

  switch (type) {
    case "hover":
      filename = "Hover.mp3";
      break;
    case "open":
      filename = "Open.mp3";
      break;
    case "select":
      filename = "Select.mp3";
      break;
    case "like":
      filename = "Like.mp3";
      break;
    case "dislike":
      filename = "Dislike.mp3";
      break;
    case "denied":
      filename = "Denied.mp3";
      break;
    default:
      return;
  }

  new Audio(`/Assets/Sounds/${filename}`).play();
}
