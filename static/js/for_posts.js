const spinner = document.getElementById('spinner-box')
const mainRow = document.querySelector('.row')
$.ajax({
    type: 'GET',
    url: 'send-data-two',
    success: function (response) {
        setTimeout(() => {
            spinner.classList.add('not-visible')
        }, 1500)
        mainRow.innerHTML = "<div id='post-box'></div>"
        const postBox=document.getElementById('post-box')
        const data = response.data
        data.forEach((element) => {
            postBox.innerHTML+=`
            ${element.title} - <b>${element.body}</b><br>
            `
        })

    },
    error: function (error) {
        console.log(error)
    }
})