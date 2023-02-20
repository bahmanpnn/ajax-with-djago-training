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
            $('#addPostModal').modal('hide')
            alertsHandle('success', 'new post added!!')
            postForm.reset()
        },
        error: function (error) {
            console.log(error)
            alertsHandle('danger', 'oops!! somthing went wrong!!')
        }

    })
})
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
