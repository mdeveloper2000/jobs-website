const form = document.querySelector("form")
form.addEventListener("submit", async (e) => {
    e.preventDefault()
    const email = form.email.value
    const password = form.password.value
    const errorsDiv = document.querySelector(".errors")
    if(email.trim() === "" || password === "") {
        errorsDiv.innerHTML = "Preencha todos os campos"
        errorsDiv.style.display = "block"
    }
    else {
        try {
            const res = await fetch('/login', {
                method: 'POST',
                body: JSON.stringify({ email, password }),
                headers: { 'Content-Type': 'application/json' }
            })
            const data = await res.json()
            if(data.message === null) {
                window.location.href = "/"
            }
            else {                    
                errorsDiv.innerHTML = data.message
                errorsDiv.style.display = "block"
            }
        } 
        catch (error) {
            console.log(error)
        }
    }
})