const request = require("postman-request")

const geoCode=(address,callBack)=>{
    const url ="https://api.mapbox.com/geocoding/v5/mapbox.places/" +  encodeURIComponent(address) +   ".json?access_token=pk.eyJ1Ijoic2hyZXlhbnNoMjkiLCJhIjoiY2tkbzZlaTQyMGk5djJ0cGF6cnBncHB1YyJ9.wyieFLJeLfDFrcmsBaRUyw"
    
  request({url/*shorthand syntax*/ , json : true},(error,response)=>{

  if(error){
      callBack("Unable to connect"/*(error)*/, /*(data) we are not passing any value hence it is undefined*/)
  
  }else if(response.body.features.length===0){
      callBack("Unable to find location")
  
  }else{
       callBack(/*Undefined error*/undefined,{
           latitude:response.body.features[0].center[1],
           longitude:response.body.features[0].center[0],
           location: response.body.features[0].place_name

       })

  }

  })

  }
  module.exports = geoCode