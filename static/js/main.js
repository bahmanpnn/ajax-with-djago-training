// functions
const alertsHandle = (type, msg) => {
    alertbox.innerHTML = `
    <div class="alert alert-${type}" role="alert">
        ${msg}
    </div>
    `
}