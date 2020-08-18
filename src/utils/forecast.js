const request = require("postman-request")

const forecast =(latitude,longitude,callBack)=>{

    const url ="http://api.weatherstack.com/current?access_key=960846893e4829b891e6ec3fad555fd8&query="+latitude+","+longitude+"&units=m"
    
  request({url/*shorthand syntax*/ , json : true},(error,response)=>{

  if(error){
      callBack("Unable to connect"/*(error)*/, /*(data) we are not passing any value hence it is undefined*/)
  
  }else if(response.body.error){
      callBack("unable to find location")
  
  }else{
       callBack(/*Undefined error*/undefined,"It is currently"+" " + response.body.current.temperature + "C" + " " + " the Air Pressure is" +" "+ response.body.current.pressure )
        
  }

  })
}

module.exports = forecast