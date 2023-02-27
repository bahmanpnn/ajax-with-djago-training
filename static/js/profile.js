const avatarBox = document.getElementById('avatar-box')
const alertbox = document.getElementById('alert-box')
const profileForm = document.getElementById('profile-form')
const csrf = document.getElementsByName('csrfmiddlewaretoken')

const bioInput = document.getElementById('id_bio')
const avatarInput = document.getElementById('id_avatar')
// console.log(avatarInput, csrf[0].value, bioInput.value)

//now we must add eventlistener to profileform that when we click to save,send a dataform to view
profileForm.addEventListener('submit', e => {
    e.preventDefault()

    //now create obj from formdata to append 3 data to that form and send to view with other data!!
    const formData = new FormData()
    formData.append('csrfmiddlewaretoken', csrf[0].value)
    formData.append('bio', bioInput.value)
    formData.append('avatar', avatarInput.files[0])

    //now we must send data with ajax to target url(that is for target view)
    //remember that if we put url in ajax empty it means that send data in that url that call
    // this ajax and use that!! so here it send ajax data(post) to url that use for profile html

    $.ajax({
        type: 'POST',
        url: '',
        enctype: 'multipart/form-data',
        data: formData,
        success: function (response) {
            // console.log(response)

            //till here everything is ok and save but we need to show avatar and bio right after
            // changing and set a new pic and bio;so we need to code js that img in avatar box
            // refresh and show new pic and bio ;)) ->

            avatarBox.innerHTML = `
            <img src="${response.avatar}" alt="${response.user.username}" class="rounded"
             height="300px" width="auto">
            `
            //We can change src attr instead of innerhtml

            bioInput.value = response.bio
            alertsHandle('success', 'your profile has been updated!!')
        },
        error: function (error) {
            console.log('error=', error)
        },
        processData: false,
        contentType: false,
        cache: false,
    })
})

