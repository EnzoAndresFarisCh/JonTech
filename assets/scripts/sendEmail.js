 function sendEmail(){
    const getSelector = (sel) => {
        return document.querySelector(sel)?.value
    }
    let params = {
        name: getSelector("#name"),
        lastname: getSelector("#lastname"),
        email: getSelector("#email"),
        subject: getSelector("#subject"),
        message: getSelector("#message")
    }
   
    emailjs.send("service_x8476of", "template_bn786eo", params).then((d) => {
        document.querySelector(".notification").classList.remove("d-none")
        document.querySelector(".notification").classList.add("d-block")
        document.querySelector("#submit-button").classList.remove("loading")
        setTimeout(() => {
            document.querySelector(".notification").classList.add("d-none")
        }, 5000)
    })
}

(() => {
    setTimeout(() => {
        const button = document.querySelector("#submit-button")
        button?.addEventListener("click", () => {
            const v =[...document.querySelectorAll(".contato input[required]")].some(e => !e.value)
            if(!v){ 
                document.querySelector("#submit-button").classList.add("loading")
                sendEmail() 
            }
        })
    }, 1000)
})() 