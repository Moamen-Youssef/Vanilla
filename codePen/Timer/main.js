let hrs = document.querySelector('.hours')
let mins = document.querySelector('.minutes')
let secs = document.querySelector('.seconds')
let afterEnd = document.querySelector('.after-end') ;

const startBtn = document.querySelector('.start');
const hours = document.querySelector('#hours');
const minutes = document.querySelector('#minutes');
const settingDiv = document.querySelector('.setting');
const timerSection = document.querySelector('.timer-sec');

class Timer {

    seconds = 1;
    timerInterval;
    quizTimer;
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

    constructor(hours, minutes, funcToRun, ...HTMLelemsInDescendingOrder) {

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

        this.quizTimer = () => {
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
                        this.minutes = 59 ;
                    }
                } else {
                    this.resetAndDecrease()
                }
            }
        }
        this.timerInterval = setInterval(this.quizTimer, 1020)
    }

    stop() {
        clearInterval(this.timerInterval)
    }
    toDo() {
        if (typeof this.funcToRun == "function") {
            this.funcToRun()
        } else {
            return 'nothing'
        }

    }
}

const toRunAfter = () => {
    afterEnd.classList.add('active')
}





startBtn.addEventListener('click', () => {

    settingDiv.classList.add('start-timer');
    timerSection.classList.add('active');

    const timer = new Timer(hours.value, minutes.value, toRunAfter, hrs, mins, secs)
    timer.run()

})