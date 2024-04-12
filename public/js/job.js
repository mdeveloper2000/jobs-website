const form = document.querySelector("form")
form.addEventListener("submit", async (e) => {
    e.preventDefault()
    const job_id = form.job_id.value
    try {
        const res = await fetch('/job/subscribe', {
            method: 'POST',
            body: JSON.stringify({ job_id }),
            headers: { 'Content-Type': 'application/json' }
        })
        const data = await res.json()
        if(data.message === null) {
            window.location.href = "/"
        }
    } 
    catch(error) {
        console.log(error)
    }
})