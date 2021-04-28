console.log('Client-side javascript is loaded!')

//selects the elements to create form and button interaction
//to render data on browser display
const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

//set paragraph elements to print on screen as a strings
messageOne.textContent = '' 
messageTwo.textContent = ''

weatherForm.addEventListener('submit', (e) =>{
    
    e.preventDefault() //display data
    const location = search.value //this extracts the value entered in searchbox
    
    //loading message
    messageOne.textContent = 'Loading...'
    messageTwo.textContent = '' //clear previous data while waiting to load

    //fetch forecast data into client-side
    fetch('http://localhost:3000/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
               // console.log(data.error)
               messageOne.textContent = data.error
            } else {
                messageOne.textContent = data.location //load in 1st paragraph
                messageTwo.textContent = data.forecast //load in 2nd paragragh
                
            }
        })
    })
})
