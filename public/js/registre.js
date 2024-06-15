form.addEventListener("submit", () => {
  const registre = {
    email: email.value, 
    password: password.value,
  }

  fetch("/api/registre", {
    method: "POST",
    body:JSON.stringify(registre),
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