const backBtn = document.getElementById('back-btn')
backBtn.addEventListener('click', function () {
    history.back()
})

//get and show detail post data
const pageUrl = window.location.href + "/data"
const spinner=document.getElementById('spinner-box')
$.ajax({
    type: 'GET',
    url: pageUrl,
    success: function (response) {
        console.log(response)
        spinner.classList.add('not-visible')
    },
    error: function (error) {
        console.log(error)
    }

})