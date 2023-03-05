const letters = 'abcdefghijklmnopqrstuvwxyz'
const lettersPlace = document.getElementById("letters") ; 
const catHolder = document.getElementById('cat') ;
const WordsPlace = document.getElementById('words-place') ;
const steckHeadHolder = document.getElementById('stick-head-holder') ;
const head = document.getElementById('head-robe') ;
const neckArms = document.getElementById('neck-arms') ;
const bodyLeg = document.getElementById('body-legs') ;

let wrongArr = [steckHeadHolder,head , neckArms , bodyLeg] ;
let  divToAppend = document.createElement('div') ;

let wordChars ;
let elemArr =[]
let checkArr = []
let msgArr = [] ;

// append letters tp the page 






for(let i =0 ; i<letters.length ; i++){
let letter = document.createElement('span')
letter.innerText= letters[i].toUpperCase()
divToAppend.appendChild(letter) ;
}

lettersPlace.appendChild(divToAppend)
let lettersBox = [...lettersPlace.children[0].children]
 
const result = (msg)=>{
    let  resultMsg = document.createElement('div') ;
    resultMsg.innerHTML = msg ;
    resultMsg.classList.add('cong-msg') ;
    document.body.appendChild(resultMsg) ;
    lettersPlace.removeEventListener('click', charsClick) ;
    if(msg == 'GAME OVER'){
        resultMsg.classList.add('failed') ;  
    }

}
const wordsCat = {
    programming: ['go' , 'javascript' , 'php' , 'python' , 'scala', 'fortran' ,'mysql'],
    movies: ['Up','Prestig', 'Inception' ,'Intresteller' , 'Memento'] ,
    playres: ['roony','Ronaldo', 'Messsi' , 'Abotreka' ,'Neymar' ,'Mpapi' ,],
    countries: ['Egypt','England' ,'Qatar' ,'Russia' ,'Syria' , 'Yemen' ,'Palastine']
}

const randomCat = () =>{

    let catArray =[] ;
    for(cat in wordsCat){
 catArray.push(cat)
    }

for(let i= 0 ; i< catArray.length ; i++){
    i =Math.floor(Math.random() * (4 - 0 + 0)) +0  
    catHolder.innerText = catArray[i]
    break ;
}

let word ;

for(let i= 0 ; i< wordsCat[catHolder.innerText].length ; i++){
len = wordsCat[catHolder.innerText].length
    i =Math.floor(Math.random() * ( len - 0 + 0)) +0
 word= wordsCat[catHolder.innerText][i]
    break ;
}
console.log(word)
wordChars = word.split('')

for(let i=0 ; i< word.length ; i++){
    let wordBox = document.createElement('div');
    wordBox.classList.add('word-box');
    let wordLetter = document.createElement('p');
    wordLetter.innerText = word[i]
    wordBox.appendChild(wordLetter)
    WordsPlace.appendChild(wordBox)
}


}

window.addEventListener('load' , randomCat)





const charsClick = (e)=>{

    for(word of WordsPlace.children){
        let elem = word.children[0] ;
        if((e.target.innerText == elem.innerText || e.target.innerText.toLowerCase() == elem.innerText) && elem.hasAttribute('hidden') == false) {
            elemArr =[]
            elemArr.push(elem)
            elemArr[0].style.display = 'block' ;
            elemArr[0].setAttribute('hidden', '') ;
           break ;
        }
    }

    checkArr= [] ;
    for( x of WordsPlace.children){
    let elem = x.children[0]
    msgArr.push(elem)
    if(e.target.innerText == elem.innerText || e.target.innerText.toLowerCase() == elem.innerText){
        checkArr.push(elem)
    }
}

for( x of WordsPlace.children){
    let elem = x.children[0]
    if(checkArr.every(item=> item.hasAttribute('hidden')) 
    && checkArr.some(item=> item == elem)){
        e.target.classList.add('active')
    }
}

    if( wordChars.every(x=>x !== e.target.innerText.toLocaleLowerCase())){
    if(wordChars[0] !== e.target.innerText){
        wrongArr[0].style.display = 'flex'
        wrongArr.splice(0,1)
         }
        }

        if(msgArr.every(x=> x.style.display == 'block')){
            result("congratulations!") ;
        }

        if(bodyLeg.style.display == 'flex'){
            result("GAME OVER") ;
        }
 
}


lettersPlace.addEventListener('click', charsClick)

