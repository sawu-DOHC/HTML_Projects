
function menu() {

  var mainNav = document.querySelector(".main-nav");
  var menuIcon = document.getElementById("icon");
  var headerH1 = document.querySelector(".welcome h1"); 

  if (mainNav.style.display === "none" || mainNav.style.display === "") {
      mainNav.style.display = "flex";
      headerH1.style.display = "none"; 
  } 
  else {
      mainNav.style.display = "none";
      headerH1.style.display = "block"; 
  }
}