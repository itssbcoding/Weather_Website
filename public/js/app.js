const weatherForm=document.querySelector('form')
const search=document.querySelector('input')
const messageOne=document.querySelector('#message-1')//for chosing a html attribute by id, we use #
const messageTwo=document.querySelector('#message-2')//for chosing with class name, we use .
const icon=document.querySelector('#icon')

weatherForm.addEventListener('submit',(event)=>{ //executes when an event occurs
    event.preventDefault() //by default submit button refreshes the page, we have to stop it so the page is not refreshed again and again

    messageOne.textContent='Loading...'
    messageTwo.textContent=''
    icon.innerHTML='<img src=>'

    const location = search.value

    fetch('/weather?address='+encodeURIComponent(location)).then((response)=>{//still doubts, study
        response.json().then((data)=>{//still doubts, study
            if(data.error){
                messageOne.textContent=data.error
            }
            else{
                messageOne.textContent=data.place
                messageTwo.textContent=data.forecastData
                icon.innerHTML='<img src='+data.icon+'>'
            }
        })
    })
})