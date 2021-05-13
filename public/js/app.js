const formInput = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#mone')
const messageTwo = document.querySelector('#mtwo')




formInput.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value

    messageOne.textContent = ''
    messageTwo.textContent = 'Loading...'

    fetch(`http://localhost:3000/weather?address=${location}`).then((res) => {
        res.json().then((data) => {
            if(data.error){
                 messageOne.textContent = data.error
            } else{
                // messageOne.textContent = data.place
                messageTwo.textContent = `It is ${data.temperature} and ${data.description} in ${data.place}.`
            }
        })
    })
})