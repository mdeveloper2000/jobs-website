const form = document.querySelector("form")
form.addEventListener("submit", async (e) => {
    e.preventDefault()
    const search = form.search.value
    const res = await fetch(`/jobs/search/${search}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    })
    const data = await res.json()
    const table = document.querySelector("table")
    const tbody = document.createElement("tbody")
    while(table.rows.length > 1) {
        table.deleteRow(1)
    }            
    if(data.jobs.length > 0) {
        data.jobs.forEach(job => {
            const link = document.createElement("a");
            link.href = `/job/${job._id}`
            const tr = document.createElement("tr")
            const td_title = document.createElement("td")
            td_title.appendChild(document.createTextNode(job.title))
            const td_company = document.createElement("td")
            td_company.appendChild(document.createTextNode(job.company))
            const td_model = document.createElement("td")
            td_model.appendChild(document.createTextNode(job.model))
            const td_action = document.createElement("td")
            const button = document.createElement("button")
            button.innerHTML = "Exibir"
            button.onclick = (e) => {
                window.location.href=link
            }
            td_action.appendChild(button)
            tr.appendChild(td_title)
            tr.appendChild(td_company)
            tr.appendChild(td_model)
            tr.appendChild(td_action)
            tbody.appendChild(tr)
            table.appendChild(tbody)
        })
    }
})