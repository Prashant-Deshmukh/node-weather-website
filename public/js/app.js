console.log("Client Side JavaScript File Is Loaded!")

// fetch("http://localhost:3000/weather?address=mumbai").then((response) => {
//     response.json().then((data) => {
//         console.log(data.error)
//         if (data.error) {
//             console.log(data.error)
//         } else {
//             console.log(data.forecast)
//             console.log(data.location)
//         }
//     })
// })


const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''
    
    fetch("http://localhost:3000/weather?address="+location).then((response) => {
        response.json().then((data) => {
            console.log(data.error)
            if (data.error) {
                console.log(data.error)
                messageOne.textContent = data.error
            } else {
                console.log(data.forecast)
                console.log(data.location)
                messageOne.textContent = data.location
                messageTwo.textContent = data.forecast
            }
        })
    })

})