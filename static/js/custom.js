const hello = document.getElementById('hello')
// hello.textContent = 'hello world'
// content = hello.textContent
// hello.innerHTML = '<h2>' + content + '</h2>'

$.ajax({
    type: 'GET',
    url: 'hello-data',
    success: function (resp) {
        // console.log('response=', resp)
        // console.log('response=', resp.posts)
        // hello.textContent=resp.posts[0]['title']
        myContent = resp['posts'][0]['title']
        hello.innerHTML = '<h3>first query title is= ' + myContent + '</h3>'
        const helloDataResponse = resp.posts
        helloDataResponse.forEach(element => {
            hello.innerHTML += `
            <p>${element['title']}</p><br>
            `
        })
    },
    error: function (error) {
        console.log('error= ', error)
    }
})
const dataOne = document.getElementById('data-one')
$.ajax({
    type: 'GET',
    url: 'send-data-one',
    success: function (res) {
        console.log('send data response is= ', typeof (res))  //object-dic
        // console.log('send data response is= ', res.posts) //string
        const data = JSON.parse(res.posts)  //object-json(dic)
        console.log('dataone is=', data[0]['fields'])
        for (let i = 0; i < data.length; i++) {
            dataOne.innerHTML += `
            <p>${data[i]['fields']['title']} - ${data[i]['fields']['body']}</p><br>
            `
        }
    },
    error: function (err) {
        console.log('send data error is= ', err)
    }
})

const dataTwo = document.getElementById('data-two')
$.ajax({
    type: 'GET',
    url: 'send-data-two',
    success: function (response) {
        // console.log('send data two is=', response)  //object-array
        const data = response.data
        data.forEach(ele => {
            dataTwo.innerHTML += `
        ${ele.title} - <b>${ele.body}</b><br>
        `
        })
    },
    error: function (error) {
        console.log(error)
    }
})