const spinner = document.getElementById('spinner-box')
const postBox = document.getElementById('post-box')
const loadBtn = document.getElementById('load-btn')
const endBox = document.getElementById('end-box')

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
                        <a href="#" class="btn btn-primary">details</a>
                    </div>
                    <div class="col-1">
                        <a href="#" class="btn btn-primary">likes</a>
                    </div>
                </div>
              </div>
            </div>
            `
            })

            console.log(response.size)
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
