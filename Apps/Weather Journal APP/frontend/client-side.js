const apiKey = "&appid=da1b25f5a3750d676cf377cfaf631ca2&units=metric" ;
const url = `https://api.openweathermap.org/data/2.5/weather?zip=` ;
let temp ;

const getApiData = async(zipCode)=>{const response =   await fetch(url+zipCode+apiKey) 
    const apiData = await response.json()  ;
     temp = apiData.main.temp 
    return temp
}




const updateUI = (displayData) => {
    document.getElementById("temp").innerHTML =` Tempreture : ${ Math.round(displayData.tempreture)}  °C`
    document.getElementById("date").innerHTML =` Date : ${displayData.date}` 
    document.getElementById("content").innerHTML =`Feeling like : ${ displayData.feelings}`
    document.getElementById("toRemove").remove() ;
}

const error = () => {
    document.getElementById("entryHolder").innerHTML = "ERROR :Non-valid zip code"
}
const performAction = async()=>{
    // generate data
    const zipCode = document.getElementById("zip").value
    const userInput = document.getElementById("feelings").value
    const date = new Date().toLocaleDateString() ;

    // get api data 
await getApiData(zipCode).catch(()=>{{
    error() ;
    /* i did this because after adding non-valid code and
      error message was shown then tried another valid one ,
      then clicked the button , the error message didnt dissapear ,
      in other words..
      the code stop its execution after getting the api data ;
     i didnt know how to handle this so i added this setTimeOut function */  
      setTimeout(()=>{location.reload()}, 1500)}})
// post data to server
 const  displayData =  {tempreture: temp , date : date , feelings : userInput}
 updateUI(displayData)
}

document.getElementById("generate").addEventListener("click" , performAction)


