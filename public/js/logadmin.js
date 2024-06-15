function checkPassword() {
  var password = document.getElementById("password").value;
  var alertBox = document.getElementById("alert");
  
  if (password.length < 8) {
    alertBox.innerText = "Password must be at least 8 characters long.";
  } else {
    alertBox.innerText = "";
    // You can add more complex validation logic here
    // For simplicity, I'm just clearing the alert box if the password meets the minimum length requirement
  }
}