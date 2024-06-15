form.addEventListener("submit", () => {
  const login = {
    email: email.value, 
    password: password.value,
  }

  fetch("/api/login", {
    method: "POST",
    body:JSON.stringify(login),
    headers: {
      "content-Type": "application/json"
    }
  }) .then (res => res.json()) 
  .then(data => {
    if (data.status == "error") {
      sucess.style.display = "none"
      error.status.display = "block"
      error.innerText = data.error
    } else {
      error.style.display = "none"
      sucess.status.display = "block"
      sucess.innerText = data.sucess
    }
  })
})