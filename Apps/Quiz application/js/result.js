//to import
let categories = [];
let arrayOfArrays = [];
const rightAswers = ["right ans q1", "right ans q2", "right ans q3", "right ans q33", "right ans q4", "right ans q5", "right ans q6", "right ans q7"];
const questionsSection = document.querySelector('.questions-sec');
// to import
let questionsArr = [];
let questionsArrIndex = 0;
document.body.classList.add('new') ;


let createIcon = (classList) => {
    return Object.assign(
        document.createElement('i'),
        {
            classList: classList
        }
    )
}

const  data = async()=>{
    //fetch data
    const displayData = await fetch("data.json");
    let data = await displayData.json();

//functions 
//-[1]
    const appendAnswers = () => {
        //spread the collector array arrays to push all the answers in one array
        for (let i = 0; i < arrayOfArrays.length; i++) {
            arrayOfAnswers.push(...arrayOfArrays[i])
        }

        // here we append all answers to its inputs
        for (let i = 0; i < arrayOfAnswers.length; i++) {
            answers[i].innerHTML = arrayOfAnswers[i];
        }
        // add the value attribute's value
        answersInput.forEach(input => {
            input.value = input.nextElementSibling.innerHTML;
            // make the inputs unclickable
            input.setAttribute('disabled', '')
        })

    }
    // push categoris to an array
    for (let cat in data) {
        categories.push(cat);
    }

    // to import
    for (let i = 0; i < categories.length; i++) {
        // push quiz questions to the arr
        questionsArr.push(...Object.keys(data[categories[i]]))
    }

    for (let i = 0; i < categories.length; i++) {

        arrayOfArrays.push(...Object.values(data[categories[i]]))
        //
        let categoryElm = document.createElement('h3')
        categoryElm.classList.add('category' , 'centered')
        categoryElm.innerHTML = categories[i]
        questionsSection.appendChild(categoryElm);


        // loop through category questions
        for (let q in data[categories[i]]) {

            // create the container of question
            let theQuestion = document.createElement('div')
            theQuestion.classList.add('question');

            //create  the element to which the question will append
            let question = document.createElement('p')
            question.classList.add('the-question');

            // create question number element
            let questionNum = document.createElement('h5')
            questionNum.classList.add('question-num' , 'circuler');

            // appen the question number and its question to the qustion container
            theQuestion.appendChild(questionNum)
            theQuestion.appendChild(question)

            //push the question to the document
            question.innerHTML = q;

            // to set the question number
            //to import appendQuestionNumber() ;
            questionsArrIndex = questionsArr.indexOf(question.innerHTML);
            questionNum.innerHTML = `Q-${questionsArrIndex + 1}`;


            // finally append the question container to the document
            questionsSection.appendChild(theQuestion)


            // create the form element and set three input elements with its assosiated labels
            let form = document.createElement('form');

            for (let i = 0; i < 3; i++) {
                let choice = document.createElement('div');
                choice.classList.add('choice') ;
                let input = document.createElement('input');
                input.type = "radio";
                input.name = "quiz-answers";
                input.id = `ans-${i + 1}`
                input.value = "";
                let label = document.createElement('label');
                label.setAttribute('for', input.id)
                choice.appendChild(input);
                choice.appendChild(label);
                form.appendChild(choice)
            }

            // append the form to the questions section
            questionsSection.appendChild(form)

        }
    }
    //END appending categoris and it's questions 

//new variables to create after page is ready
//to import
const answers = document.querySelectorAll('.questions-sec form label');
const questions = document.querySelectorAll('.questions-sec .question .the-question');
const questionsElements = [...questions];
//to import
const answersInput = document.querySelectorAll('.questions-sec form input');
// array that will collect all answers 
let arrayOfAnswers = [];
    appendAnswers() ;
    const section = document.querySelector('.questions-sec') ;
    section.style.border = 'none'
    // loop through question *elemnt* array
    questionsElements.some(
        question => {

            //the question index in the questions array (to match the answer index)
            const questionIndex = questionsArr.indexOf(question.innerHTML);
            // loop through the storage object
            for (let q in sessionStorage) {
                //if any question elements inner html equal to a key in the object
                if (question.innerHTML == q) {
                    // assign the key's value(which is the student's answer) to a variable
                    let answer = sessionStorage.getItem(q);

                    //so insid the passed quesion get its label elemnts 
                    // to assure checking the related answer (what if there are similar answers?)
                    const formElem = question.parentElement.nextElementSibling
                    let labelsOfquestion = formElem.querySelectorAll("label");
                    // function to append the correction box
                    const appendTheCorrection = () => {
                        //create the box that will dispaly the correction when answering wrong
                        let answerResultDiv = document.createElement('div');
                        answerResultDiv.innerHTML = `right answer is:`;

                        // the right answer box 
                        let rightAswer = document.createElement('span');
                        rightAswer.classList.add('marked');
                        rightAswer.innerHTML = rightAswers[questionIndex];

                        // css class that adds styling to the box
                        answerResultDiv.classList.add('answer-correction')
                        formElem.appendChild(answerResultDiv);
                        answerResultDiv.appendChild(rightAswer);
                        if (answer == '') {
                            let theP = document.createElement('p');
                            theP.innerHTML = "Why no answer ? ";
                            answerResultDiv.prepend(theP)

                        }
                    }

                    if (answer == '') {
                        appendTheCorrection();
                        question.appendChild(createIcon("fa-regular fa-circle-xmark  fa-2x wrong"))
                    }

                    //then loop through label elements
                    for (label of labelsOfquestion) {
                        // catch the label that its value = the key's value in the storage
                        if (label.innerHTML == answer) {
                            let inputToCheck = label.previousElementSibling;
                            //once you catch it check its assosiated input
                            inputToCheck.checked = true;
                            //then unchek the rest of inputs
                            inputToCheck.removeAttribute('disabled');

                            // if the label inner html (which is the student answer) equal to the answer that is in the index = the label's question index
                            if (label.innerHTML == rightAswers[questionIndex]) {
                                // appear it is right
                                label.classList.add('answer-right');
                                question.appendChild(createIcon("fa-solid fa-check fa-2x right"))
                            }
                            else {
                                // appear it is wrong and append the correction
                                label.classList.add('answer-wrong', 'student-answer');
                                question.appendChild(createIcon("fa-regular fa-circle-xmark  fa-2x wrong"))
                                appendTheCorrection();
                            }

                        }
                    }
                }
            }
        }
    )
    

    // for the result box 
    const score = document.querySelectorAll('i.right');
    let scorCard = document.createElement('div');
    let scoreP = document.createElement('p');
    let scorePercentage = (score.length / questionsArr.length) * 100
    
    if (scorePercentage < 60) {
        scorCard.classList.add('score-card', 'red');
        scorCard.innerHTML = `you faild`
        scoreP.innerHTML = `you got ${scorePercentage}%`
    } else {
        scorCard.classList.add('score-card', 'green');
        scorCard.innerHTML = ` congratulation you passed !`
        scoreP.innerHTML = `you got ${scorePercentage}%`
    }
    scorCard.appendChild(scoreP);
    questionsSection.prepend(scorCard) 

}
data() ;




