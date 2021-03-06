const weatherForm = document.querySelector("form")
const searchElement= document.querySelector("input")
const messageOne= document.querySelector("#message-1")
const messageTwo= document.querySelector("#message-2")

// messageOne.textContent="From JS"

weatherForm.addEventListener("submit",(event)=>{
event.preventDefault()// it will prevent the default behaviour i.e refreshing of page everytime we click submit
     const location = searchElement.value

     messageOne.textContent ="Loading..."
     messageTwo.textContent =""

     //heroku 
     fetch("/weather?address=" + location).then((response)=>{
    response.json().then((data)=>{
          if(data.error){
            messageOne.textContent= data.error
          }else{
              
            messageOne.textContent = data.location
    
            messageTwo.textContent =   data.forecast
           console.log( data.forecast)
          }
     })
   })

})