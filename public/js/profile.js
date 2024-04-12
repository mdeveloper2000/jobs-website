const form = document.querySelector("form")
const allLanguages = document.querySelector("#allLanguages")
const allTechs = document.querySelector("#allTechs")    
const languagesCheck = document.querySelectorAll(".languages")
const technolgiesCheck = document.querySelectorAll(".technologies")
const errorsDiv = document.querySelector(".errors")

allLanguages.addEventListener("change", () => {
    for(let i = 0; i < languagesCheck.length; i++) {
        languagesCheck[i].checked = allLanguages.checked
    }
})

allTechs.addEventListener("change", () => {
    for(let i = 0; i < technolgiesCheck.length; i++) {
        technolgiesCheck[i].checked = allTechs.checked
    }
})

form.addEventListener("submit", async (e) => {
    e.preventDefault()
    const name = form.name.value
    const email = form.email.value
    const telephone = form.telephone.value
    const website = form.website.value
    const city = form.city.value
    const education = form.education.value
    const experience = form.experience.value
    const extra = form.extra.value
    let techSelected = []        
    for(let i = 0; i < technolgiesCheck.length; i++) {
        if(technolgiesCheck[i].checked) {
            if(!techSelected.includes(technolgiesCheck[i].name)) {
                techSelected.push(technolgiesCheck[i].name)
            }
        }
    }
    let languageSelected = []        
    for(let i = 0; i < languagesCheck.length; i++) {
        if(languagesCheck[i].checked) {
            if(!languageSelected.includes(languagesCheck[i].name)) {
                languageSelected.push(languagesCheck[i].name)
            }
        }
    }
    if(name.trim() === "") {
        errorsDiv.innerHTML = "O nome precisa ser informado"
        errorsDiv.style.display = "block"
    }
    else if(education.trim() === "") {
        errorsDiv.innerHTML = "A escolaridade precisa ser informada"
        errorsDiv.style.display = "block"
    }
    else {
        try {                
            const res = await fetch('/profile/update', {
                method: 'POST',
                body: JSON.stringify({ name, email, telephone, city, website, education, 
                                    languages: languageSelected, technologies: techSelected, experience, extra }),
                headers: { 'Content-Type': 'application/json' }
            })
            const data = await res.json()
            if(data.message === null) {
                errorsDiv.classList.remove("pico-background-red-500")
                errorsDiv.classList.add("pico-background-blue-500")
                errorsDiv.innerHTML = "Perfil atualizado com sucesso"
                errorsDiv.style.display = "block"
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