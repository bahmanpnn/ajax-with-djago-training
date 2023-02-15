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
        const postBox = document.getElementById('post-box')
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
        // data.forEach((element) => {
        //     postBox.innerHTML+=`
        //     ${element.title} - <b>${element.body}</b><br>
        //     `
        // })

    },
    error: function (error) {
        console.log(error)
    }
})