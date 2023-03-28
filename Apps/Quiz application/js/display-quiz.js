// variables
const category = document.querySelector('.questions-sec .question .category');
const question = document.querySelector('.questions-sec .question .the-question');
const questionNumber = document.querySelector('.questions-sec .question .question-num');
const answers = document.querySelectorAll('.questions-sec form label');
const answersInput = document.querySelectorAll('.questions-sec form input');
const answersArr = [...answers];
const inputsArr = [...answersInput]
const nextBtn = document.querySelector('button.next-btn');
const previousBtn = document.querySelector('button.previous-btn');
const attemptBtn = document.querySelector('button.attempt-btn');
const rightAswers = ["right ans q1", "right ans q2", "right ans q3", "right ans q33", "right ans q4", "right ans q5", "right ans q6", "right ans q7"];
let hrs = document.querySelector('.hours')
let mins = document.querySelector('.minutes')
let secs = document.querySelector('.seconds')
let categories = [];
let questionsArr = [];
let studentAnswers = []; // the array of the student's answers (assosiatd to questionsArr) 
let questionsArrIndex = 0;
let length = 0;// number of all questions
let index = 0; // categories array's index
let arrIndex = 0; //the question index in the arr array (category questions)
//
const data = async () => {

    //fetch data
    const displayData = await fetch("data.json");
    let data = await displayData.json();

    //functions


    //-[0]
    //append category name to the page
    const categoryName = () => {
        category.innerHTML = categories[index];
    }

    //-[1]
    // dedect the number of questions && collect all questions in an array
    const questionsToPush = () => {
        for (let i = 0; i < categories.length; i++) {
            let length2 = Object.keys(data[categories[i]]).length;
            length += length2;
            //create array of questions
            questionsArr.push(...Object.keys(data[categories[i]]))
        }
    }

    //-[2]
    // append value attribute text
    const addValueAttributeText = () => {
        answersInput.forEach(input => {
            input.value = input.nextElementSibling.innerHTML;
        })
    }

    //-[3]
    // fetch answers of the question and append it to the page
    const appendAnswers = () => {
        for (let q in data[categories[index]]) {
            question.innerHTML = q;

            let questionIndex = 0;
            answers.forEach(answer => {
                answer.innerHTML = data[categories[index]][q][questionIndex];
                questionIndex++;
            })
            //append value attribute text
            addValueAttributeText();
            break;
        }
    }

    //-[4]
    //to append question number
    const appendQuestionNumber = () => {
        questionsArrIndex = questionsArr.indexOf(question.innerHTML);
        questionNumber.innerHTML = `Q-${questionsArrIndex + 1}`;
    }

    //-[5]
    //function that LOOP through the questions of category and go to next or previous question
    const moveTo = () => {

        generateKeysArr();

        for (let q in data[categories[index]]) {
            //show question
            if (q == arr[arrIndex] && arrIndex < arr.length) {
                question.innerHTML = q;

                // append question number 
                appendQuestionNumber();

                let questionIndex = 0;
                //show quesion answers
                answers.forEach(answer => {
                    answer.innerHTML = data[categories[index]][q][questionIndex];
                    questionIndex++;
                })

                //append value attribute text
                addValueAttributeText();

                //to keep the checked answer as it is 

                //first uncheck all inputs
                answersInput.forEach(input => {
                    input.checked = false
                }
                )
                // then loop through storage keys  
                for (let i = 0; i < window.sessionStorage.length; i++) {
                    // if the question in view is stored 
                    if (question.innerHTML == Object.keys(sessionStorage)[i]) {

                        /*
                        then loop through the inputs and check its values attributes ,
                        for the value that is equal to the key's value  ,
                        check it 
                        */
                        answersInput.forEach(input => {
                            if (input.value == sessionStorage.getItem(sessionStorage.key(i))) {
                                input.checked = true;
                            }
                        })
                    }
                }
            }
        }

        // if the question has no answer add the question and empty anser
        inputsArr.every(
            input => {
                if (input.checked !== true) {
                    window.sessionStorage.setItem(question.innerHTML, '');

                }
            }
        )

    }

    //-[6]
    //go to next question when click the next button 
    const goToNextQuestion = () => {
        previousBtn.removeAttribute('disabled', '');
        previousBtn.classList.add('change-curser');
        arrIndex++;
        // check if questions ended then move to the next category
        if (arrIndex == arr.length) {
            arrIndex = 0;
            index += 1;
            categoryName();
            appendAnswers();
        }
        moveTo();

        // check if it is the last  category 
        if (index == categories.length - 1) {
            //if it is the last question in the exam 
            if (question.innerHTML == arr[arr.length - 1]) {
                nextBtn.setAttribute("disabled", '')
            }
        }
    }

    //-[7]
    // go to the previous question 
    const backToPreviousQuestion = () => {

        arrIndex--;
        nextBtn.removeAttribute("disabled", '')
        // check if questions ended then move to the next category
        if (arrIndex == -1) {
            index -= 1;
            categoryName();
            //very important call 
            generateKeysArr();
            arrIndex = arr.length - 1;
        }

        moveTo();

        if (index == 0 && question.innerHTML == arr[0]) {
            previousBtn.setAttribute('disabled', '')
        }
    }

    //-[8]
    const generateKeysArr = () => {
        //arr of questions of the category
        arr = Object.keys(data[categories[index]]);
    }

    //-[9]
    const saveToStorage = (e) => {
        //push the answer to the checkerArr in the index assosiated with the questionsArr
        answersArr.some(
            answer => {
                let theAnswer = answer.attributes.for.value
                if (e.target.id == theAnswer) {
                    //the checked answer
                    //push the answer to its index in the student answers array
                    studentAnswers.splice(questionsArrIndex, 1, e.target.attributes.value.value);

                }
            })

        //set the question and its answer as a key and its value in the session storage
        window.sessionStorage.setItem(question.innerHTML, e.target.value);

    }

    //-[10]
    const confirmAtteptance = () => {
        if (sessionStorage.length !== questionsArr.length) {
            window.alert('there are still questions that you haven\'t seen yet')
        }
        else {
            let confirmMsg = window.confirm("Are you sure ? you will not be able to get back")
            if (confirmMsg == true) {
                window.location.replace('result.html');
            }
        }
    }

    //-[11]
    class Timer {

        seconds = 1;
        timerInterval;

        resetAndDecrease = () => {
            this.minutes--;
            this.seconds = 60;
        }

        secondDecrease = () => {
            if (this.seconds !== 0) {
                this.seconds--;
            } else {
                clearInterval(this.secondDecrease)
            }
        }

        constructor(hours, minutes,funcToRun , ...HTMLelemsInDescendingOrder) {
            
            this.HTMLelemsInDescendingOrder = HTMLelemsInDescendingOrder
            this.minutes = minutes;
            this.hours = hours;
            this.funcToRun = funcToRun
        }

        decreaseTo() {
            return setInterval(this.secondDecrease, 995)
        }
        appendTimer() {
            this.HTMLelemsInDescendingOrder[0].innerHTML = this.hours
            this.HTMLelemsInDescendingOrder[1].innerHTML = this.minutes
            this.HTMLelemsInDescendingOrder[2].innerHTML = this.seconds
            this.HTMLelemsInDescendingOrder.forEach(elem => {
                if (elem.innerHTML < 10) {
                    elem.innerHTML = `0${elem.innerHTML}`
                }
            })
        }

        run() {

            const quizTimer = () => {
                if (this.seconds == 0) {
                    throw new ('seconds must be greater than or equal to 1')
                }
                this.seconds--;
                this.appendTimer()
                if (this.seconds == 0) {
                    if (this.hours == 0 && this.minutes == 0) {
                        this.seconds = 0
                        clearInterval(this.timerInterval)
                        this.toDo()
                    }
                    if (this.minutes == 1) {
                        if (this.hours == 0) {
                            this.resetAndDecrease()
                        } else {
                            this.resetAndDecrease()
                            async () => {
                                decreaseTo();
                            }
                            this.hours--;
                        }
                    } else {
                        this.resetAndDecrease()
                    }
                }
            }
            this.timerInterval = setInterval(quizTimer, 1020)
        }
        stop(){
            clearInterval(this.timerInterval)
        }
        toDo(){
            if(typeof this.funcToRun == "function"){
                this.funcToRun()
            }else{
                return 'nothing'
            }

        }
    }
    //END 

    //start execution

    // push categoris to an array
    for (let cat in data) {
        categories.push(cat);
    }
    //creat an array of the questions of the first category
    let arr = Object.keys(data[categories[index]]);
    questionsToPush();

    // adapt the length of student answers to be equal the questions array length 
    studentAnswers.length = questionsArr.length;

    categoryName();
    appendAnswers();
    const timer = new Timer(0, 1,()=>{
        window.location.replace('result.html')
    }, hrs, mins, secs);
    timer.run();


    //END 

    //event listener

    nextBtn.addEventListener('click', goToNextQuestion)

    previousBtn.addEventListener('click', backToPreviousQuestion)

    attemptBtn.addEventListener('click', confirmAtteptance)

    answersInput.forEach(input => { input.addEventListener('click', saveToStorage) })

    //END

}

data()




