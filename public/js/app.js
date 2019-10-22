const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const loadingText = document.querySelector('#loading-text')
const infoText = document.querySelector('#info-text')
const errorText = document.querySelector('#error-text')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value
    loadingText.textContent = 'Loading...'

    fetch('/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            loadingText.textContent = ''
            if (data.error) {
                errorText.textContent = data.error
                infoText.textContent = ''
            } else {
                errorText.value = ''
                infoText.textContent = `Temperature is ${data.temperature} degrees. There is ${data.rainChance} % of rain. ${data.place}`
            }
        })
    })
})