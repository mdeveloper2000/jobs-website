const form = document.querySelector("form")
form.addEventListener("submit", async (e) => {
    e.preventDefault()
    const name = form.name.value
    const email = form.email.value
    const password = form.password.value
    const errorsDiv = document.querySelector(".errors")
    if(name.trim() === "" || email.trim() === "" || password === "") {
        errorsDiv.innerHTML = "Preencha todos os campos"
        errorsDiv.style.display = "block"
    }
    else {
        try {
            const res = await fetch('/register/create', {
                method: 'POST',
                body: JSON.stringify({ name, email, password }),
                headers: { 'Content-Type': 'application/json' }
            })
            const data = await res.json()
            if(data.message === null) {
                errorsDiv.classList.remove("pico-background-red-500")
                errorsDiv.classList.add("pico-background-blue-500")
                errorsDiv.innerHTML = "Usuário registrado com sucesso"
                errorsDiv.style.display = "block"
                form.reset()
            }
            else {
                errorsDiv.innerHTML = data.message
                errorsDiv.style.display = "block"
            }
        } 
        catch(error) {
            console.log(error)
        }
    }
})