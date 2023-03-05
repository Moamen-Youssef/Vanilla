const elems = document.body.firstElementChild;
const btns = document.getElementsByTagName('button') ;
const selectBtn = btns[0] ;
const startBtn = btns[2] ;
const select = document.getElementsByClassName('selected-items')[0];
const gameLevels = document.getElementById('game-levels');
const level = document.getElementsByClassName('level')[0] ;
const seconds = document.getElementsByClassName('seconds')[0] ;
const toType = document.getElementsByClassName('to-type')[0] ;
const wordsBox = document.getElementsByClassName('words-box')[0]
const input = document.getElementsByTagName('input')[0] ;
const theRest = document.getElementsByClassName('word')
const timeLeft = document.getElementsByClassName('time-left')[0] ;
const score = document.getElementsByClassName('score')[0]
const wordsScore = document.getElementsByClassName('words-score')[0] ;
const controlBar = document.getElementsByClassName('control')[0] ;
const endMsg = document.getElementById('end-msg') ;
// put any number of words
const words = [
 'fortran'  , 'up' , 'python' , 'dodz' , 'javascript' , 'yellow' , 'dynamic'
]

let wordToType ;

let scoreCounter = 0 ;


const gameOver = () =>{
    endMsg.classList.add('game-over') ;
    endMsg.innerText = 'GAME OVER' ;
    btns[1].classList.add('active-re')
    startBtn.remove() ;
}


const showLevels = ()=>{
select.classList.toggle('active');
}


const getReady = (e)=>{

if(e.target.hasAttribute('id') == false){

    selectBtn.classList.add('de-active') ;
    select.classList.add('de-active') ;

    level.innerText = e.target.innerText ;
    wordsScore.append(` ${words.length}`)

    if(e.target.innerText == 'Easy'){
        seconds.innerText = '7 sec'
        timeLeft.innerText = ' 7 '
    }else{
        seconds.innerText = '5sec' ;
        timeLeft.innerText = ' 5 '
    }
    
    for(x of elems.children){
        if(getComputedStyle(x).opacity == '0'){
            x.classList.add('active')
        }
    }
}
}



const generateRandomWord = ()=>{

    let x = Math.floor( Math.random() * (words.length-1 - 0 + 1)) + 0 ; 

    if(words.length !== 0 ){
        toType.innerText = words[x] ;
        wordToType  = words[x] ;
    }
    
    else{

      toType.innerText = '' ;
      input.remove() ;
      endMsg.classList.add('cong-msg')
      startBtn.remove() ;
      btns[1].classList.add('active-re') ;
      controlBar.firstElementChild.remove() ;
     controlBar.prepend('Time Left 0 Sec') ;
      endMsg.innerText = 'CONGRATULATIONS !' ;

    }

}

const startGame = ()=>{

generateRandomWord() ;

for(let i =0 ; i< words.length ; i++ ){
    let elem = document.createElement('span') ;
    elem.className = 'word' ;

   if(words[i] !== wordToType){
    elem.innerText = words[i]
   wordsBox.appendChild(elem)
   }else{
    elem.remove()
   }
}

input.focus()
input.value = '' ;

let timer =  ()=>{
    timeLeft.innerText-- ;
    if(timeLeft.innerText == '0' || endMsg.innerHTML !== ''){
        clearInterval(interval) ;
    }
    if(timeLeft.innerText == '0' ){
        gameOver() ;
    }
}

let interval = setInterval(timer ,1000)
}



let numOfWordIndex = 0

const check =(e)=>{

    if(e.data == wordToType[numOfWordIndex]){
        numOfWordIndex++
    }else{
        input.blur()
        timeLeft.innerText = 1 ;
        gameOver()
    }

if(input.value == wordToType){
    input.value = '' ;
    input.focus() ;
    timeLeft.innerText = seconds.innerText[0] ;
    scoreCounter++ ;
    score.innerText = scoreCounter ;
    numOfWordIndex = 0 ;
    words.forEach((x,i)=>{if(x == wordToType){words.splice(i,1)}}) ;
    generateRandomWord() ;

    for(y of theRest){
        if(y.innerText == wordToType){
            y.remove() 
        }
    }}

}
      


selectBtn.addEventListener('click' , showLevels)

gameLevels.addEventListener('click', getReady)

startBtn.addEventListener('click' , startGame)

input.addEventListener('input' , check)

btns[1].addEventListener('click' , ()=>{
    document.location.reload()
})
