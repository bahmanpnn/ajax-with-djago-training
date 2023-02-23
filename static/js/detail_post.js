const backBtn = document.getElementById('back-btn')
const updateBtn = document.getElementById('update-btn')
const deleteBtn = document.getElementById('delete-btn')
const postBox = document.getElementById('post-box')
const alertbox=document.getElementById('alert-box')

backBtn.addEventListener('click', function () {
    history.back()
})

//get and show/update/delete detail post data
const pageUrl = window.location.href + "/data"

const spinner = document.getElementById('spinner-box')
const titleInput = document.getElementById('id_title')
const bodyInput = document.getElementById('id_body')

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

            titleInput.value = data.title
            bodyInput.value = data.body
        }
        // show title and body
        const titleEl = document.createElement('h3')
        titleEl.setAttribute('class', 'mt-3')
        titleEl.setAttribute('id', 'formTitle')
        const bodyEl = document.createElement('p')
        bodyEl.setAttribute('class', 'mt-1')
        bodyEl.setAttribute('id', 'formBody')

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

//update and delete post
const updateUrl = window.location.href + "/update"
const deleteUrl = window.location.href + "/delete"

const updateForm = document.getElementById('update-form')
const deleteForm = document.getElementById('delete-form')
const csrf = document.getElementsByName('csrfmiddlewaretoken')
// i cant understand why dont put getcookie function like posts page to get csrf_token!!?
//but it works alone and get csrfmiddlewaretoken from detailpage.i think it access to other
// pages and files...

updateForm.addEventListener('submit', e => {
    e.preventDefault()
    const title = document.getElementById('formTitle')
    const body = document.getElementById('formBody')
    $.ajax({
        type: 'POST',
        url: updateUrl,
        data: {
            'csrfmiddlewaretoken': csrf[0].value,
            'title': titleInput.value,
            'body': bodyInput.value
        },
        success: function (response) {
            console.log(response)
            alertsHandle('success','post updated ;))')
            //alertsHandle is function that writed in main.js functions to help show alerts
            title.textContent=response.title
            body.textContent=response.body
            // $('#updateModal').modal('hide')
        },
        error: function (error) {
            console.log(error)
        }
    })
})