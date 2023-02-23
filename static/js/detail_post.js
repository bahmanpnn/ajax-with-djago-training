const backBtn = document.getElementById('back-btn')
const updateBtn = document.getElementById('update-btn')
const deleteBtn = document.getElementById('delete-btn')
const postBox = document.getElementById('post-box')

backBtn.addEventListener('click', function () {
    history.back()
})

//get and show detail post data
const pageUrl = window.location.href + "/data"
const spinner = document.getElementById('spinner-box')

$.ajax({
    type: 'GET',
    url: pageUrl,
    success: function (response) {
        console.log(response)
        const data = response.data
        if (data.logged_in !== data.author) {
            console.log('different=> author=', data.author, 'user_logged_in=', data.logged_in)
            updateBtn.setAttribute('class', 'not-visible')
            deleteBtn.setAttribute('class', 'not-visible')
        } else {
            updateBtn.classList.remove('not-visible')
            deleteBtn.classList.remove('not-visible')
            //set title and body in update form
            const titleInput = document.getElementById('id_title')
            const bodyInput = document.getElementById('id_body')
            titleInput.value = data.title
            bodyInput.value = data.body
        }
        // show title and body
        const titleEl = document.createElement('h3')
        titleEl.setAttribute('class', 'mt-3')
        const bodyEl = document.createElement('p')
        bodyEl.setAttribute('class', 'mt-1')

        titleEl.textContent = data.title
        bodyEl.textContent = data.body

        postBox.appendChild(titleEl)
        postBox.appendChild(bodyEl)

        spinner.classList.add('not-visible')
    },
    error: function (error) {
        console.log(error)
    }

})