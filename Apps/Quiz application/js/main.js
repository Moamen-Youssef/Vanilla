//variables
const startBtn = document.querySelector('button') ;
const nameLabel = document.querySelector('label input') ;
//to export 
let name ;
//functions 

const nameFirst = ()=>{
    
    if(nameLabel.value !== ''){
        startBtn.removeAttribute("disabled" , '') ;
        startBtn.classList.add('active') ;
        name = nameLabel.value  ;
    }
    else{
        startBtn.setAttribute("disabled" , '')
        startBtn.classList.remove('active') ;
    }

}
//Event listeners 

nameLabel.addEventListener('input' , nameFirst)

startBtn.addEventListener('click' , ()=>{
    window.location.replace("quiz.html")
})