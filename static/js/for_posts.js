const spinner = document.getElementById('spinner-box')
const postBox = document.getElementById('post-box')
const loadBtn = document.getElementById('load-btn')
const endBox = document.getElementById('end-box')
const pageUrl = window.location.href
// console.log(pageUrl)


const getCookie = (name) => {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

const csrftoken = getCookie('csrftoken');
// const csrftoken = Cookies.get('csrftoken');

//
const likeUnlikePost = () => {
    const likeUnlikeForms = [...document.getElementsByClassName('like-unlike-forms')]
    likeUnlikeForms.forEach(form => form.addEventListener('submit', e => {
        e.preventDefault()
        const clickedId = e.target.getAttribute('data-form-id')
        const clickedBtn = document.getElementById(`like-unlike-${clickedId}`)
        $.ajax({
            type: 'POST',
            url: "like_unlike",
            // headers: {'X-CSRFToken': csrftoken},
            data: {
                'csrfmiddlewaretoken': csrftoken,
                'pk': clickedId,
            },
            success: function (resp) {
                console.log(resp)
                clickedBtn.textContent = resp.liked ? `Unlike(${resp.count})` : `Like(${resp.count})`
            },
            error: function (error) {
                console.log(error)
            }
        })
    }))
}
let visible = 3
const getData = function () {
    $.ajax({
        type: 'GET',
        url: `send-data-two/${visible}`,
        success: function (response) {
            setTimeout(() => {
                spinner.classList.add('not-visible')
            }, 500)
            const data = response.data
            console.log(data)
            data.forEach((element) => {
                postBox.innerHTML += `
            <div class="card text-center mb-3">
              <div class="card-header">
                ${element.id}
              </div>
              <div class="card-body">
                <h5 class="card-title">${element.title}</h5>
                <p class="card-text">${element.body}</p>

              </div>
              <div class="card-footer">
                <div class="row justify-content-center">
                    <div class="col-1">
                        <a href="${pageUrl}/${element.id}" class="btn btn-primary">details</a>
                    </div>
                    <div class="col-1">
                    <form class="like-unlike-forms" data-form-id="${element.id}">
                        <button class="btn btn-danger" id="like-unlike-${element.id}">
${element.liked ? `Unlike(${element.count})` : `Like(${element.count})`}
                        </button>
                    </form>
                    </div>
                </div>
              </div>
            </div>
            `
            })
            likeUnlikePost()
            if (response.size === 0) {
                endBox.textContent = 'no post added yet!!'
            } else if (response.size <= visible) {
                loadBtn.classList.add('not-visible')
                endBox.textContent = 'there is no more posts to load!!'
            }
        },
        error: function (error) {
            console.log(error)
        }
    })
}

loadBtn.addEventListener('click', () => {
    spinner.classList.remove('not-visible')
    visible += 3
    getData()
})

//create post form(modal)that is in html
const postForm = document.getElementById('post-form')
const formTitle = document.getElementById('id_title')
const formBody = document.getElementById('id_body')
const csrf = document.getElementsByName('csrfmiddlewaretoken')

// this is for send post id for add images in dropzone that need id to send form to view
let newPostId = null

const alertbox = document.getElementById('alert-box')
// console.log(csrf[0].value)
postForm.addEventListener('submit', e => {
    e.preventDefault()
    $.ajax({
        type: 'POST',
        url: '',
        data: {
            'csrfmiddlewaretoken': csrf[0].value,
            'title': formTitle.value,
            'body': formBody.value
        },
        success: function (response) {
            console.log(response)
            newPostId = response.id
            postBox.insertAdjacentHTML('afterbegin', `
                            <div class="card text-center mb-3">
              <div class="card-header">
                ${response.id}
              </div>
              <div class="card-body">
                <h5 class="card-title">${response.title}</h5>
                <p class="card-text">${response.body}</p>

              </div>
              <div class="card-footer">
                <div class="row justify-content-center">
                    <div class="col-1">
                        <a href="${pageUrl}/${response.id}" class="btn btn-primary">details</a>
                    </div>
                    <div class="col-1">
                    <form class="like-unlike-forms" data-form-id="${response.id}">
                        <button class="btn btn-danger" id="like-unlike-${response.id}">
${response.liked ? `Unlike` : `Like(0)`}
                        </button>
                    </form>
                    </div>
                </div>
              </div>
            </div>
                `)
            likeUnlikePost()
            // $('#addPostModal').modal('hide')
            // postForm.reset()
            alertsHandle('success', 'new post added!!')
        },
        error: function (error) {
            console.log(error)
            alertsHandle('danger', 'oops!! somthing went wrong!!')
        }

    })
})

//deleted alert
const postDeleted = localStorage.getItem('deletedTitle')
if (postDeleted) {
    console.log('deleted')
    alertsHandle('danger', `the "${postDeleted}" deleted!!`)
    localStorage.clear()
} else {
    if (postDeleted !== null) {
        alertsHandle('danger', `the post did not deleted!!`)
        localStorage.clear()
    }
}
//edit forms for dropzone
const myDropzone = document.getElementById('my-dz')
const addBtn = document.getElementById('add-btn')
const closeBtn = [...document.getElementsByClassName('add-modal-close')]

//show dropzone after post added to drop target images in that zone to add
addBtn.addEventListener('click', () => {
    myDropzone.classList.remove('not-visible')
})


//add again not-visible class to dropzone divison to when add post uses again we cant see dropzone
closeBtn.forEach(btn => btn.addEventListener('click', () => {
    postForm.reset()
    if (!myDropzone.classList.contains('not-visible')) {
        myDropzone.classList.add('not-visible')
        const dz = Dropzone.forElement('#my-dz')
        dz.removeAllFiles(true)
    }


}))

// limitation for dropzone
Dropzone.autoDiscover = false
//if we dont set this dropzone.autodiscover=false try atach files twice or more!
// dropzone is from main dropzone js file that next line we create obj form it.
const dropzone = new Dropzone('#my-dz', {
    url: 'image-upload',
    init: function () {
        this.on('sending', function (file, xhr, formData) {
            formData.append('csrfmiddlewaretoken', csrftoken)
            formData.append('new_post_id', newPostId)
        })
    },
    maxFiles: 3,
    maxFilesize: 4,
    acceptedFiles: '.png ,.jpg, .jpeg'
})
//todo:next time set condition to if form filled(and drop images for it) dont add again that
// data(title and body) and alert error or nothing and block to add data to dont let add data twice

getData()


// ------------------------------------------------------------------------------------ main way :/


// const spinner = document.getElementById('spinner-box')
// const mainRow = document.querySelector('.row')
// let visible = 3
// const getData = () => {
//     $.ajax({
//         type: 'GET',
//         url: `send-data-two/${visible}`,
//         success: function (response) {
//             setTimeout(() => {
//                 spinner.classList.add('not-visible')
//             }, 500)
//             mainRow.innerHTML = "<div id='post-box'></div>"
//             const postBox = document.getElementById('post-box')
//             const data = response.data
//             // data.forEach((element) => {
//             //     postBox.innerHTML+=`
//             //     ${element.title} - <b>${element.body}</b><br>
//             //     `
//             // })
//             data.forEach((element) => {
//                 postBox.innerHTML += `
//             <div class="card text-center mb-3">
//               <div class="card-header">
//                 ${element.id}
//               </div>
//               <div class="card-body">
//                 <h5 class="card-title">${element.title}</h5>
//                 <p class="card-text">${element.body}</p>
//
//               </div>
//               <div class="card-footer">
//                 <div class="row justify-content-center">
//                     <div class="col-1">
//                         <a href="#" class="btn btn-primary">details</a>
//                     </div>
//                     <div class="col-1">
//                         <a href="#" class="btn btn-primary">likes</a>
//                     </div>
//                 </div>
//               </div>
//             </div>
//             `
//             })
//             mainRow.innerHTML += '<div class="text-center mb-3" id="end-box"><button' +
//                 ' class="btn btn-primary" id="load-btn">load more</button></div>'
//             const loadBtn = document.getElementById('load-btn')
//             const endBox = document.getElementById('end-box')
//             console.log(response.size)
//             if (response.size === 0) {
//                 endBox.textContent = 'no post added yet!!'
//             } else if (response.size <= visible) {
//                 loadBtn.classList.add('not-visible')
//                 endBox.textContent = 'no more posts to load!!'
//             }
//         },
//         error: function (error) {
//             console.log(error)
//         }
//     })
// }
// getData()
// // const loadBtn = document.getElementById('load-btn')
// loadBtn.addEventListener('click', () => {
//     spinner.classList.remove('not-visible')
//     visible += 3
//     getData()
// })
