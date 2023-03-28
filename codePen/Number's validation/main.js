// Old (learning-journey) code :D 
/* the input field can :
 1- accept one number input
 2- you can move left and right and overwrite the numbr without deleting it 
*/

numsCont = document.getElementById('nums-cont').children;
const btn = document.getElementsByTagName('button')[0];
const re = document.getElementsByTagName('button')[1];

const go = (e) => {

    btn.innerText = 'SUBMIT';
    btn.classList.remove('valid', 'not-valid')
    for (x of numsCont) {
        if (e.target.value.length == 1) {
            e.target.blur();
            e.target.style.background = 'white'
            e.target.nextElementSibling.focus();
        }
        if (e.target.nextElementSibling.value.length == 1) {
            e.target.nextElementSibling.focus();
        }



        if (e.target.value.length > 1) {
            e.target.value = e.target.value[1]
        }

        if (isNaN(Number(x.value))) {
            x.value = ''
            x.focus();
            x.style.background = 'red'
        }
        if (e.target == numsCont[10]) {
            btn.focus()
        }

    }
}

const check = () => {
    let numbersArr = [];
    for (x of numsCont) {
        numbersArr.push(x.value);
        numbersArr.splice(11)
        if (numbersArr.every(y => y !== '')) {
            btn.innerText = 'valid number';
            btn.classList.add('valid');
        } else {
            btn.innerText = 'fill the empty fields!';
            btn.classList.add('not-valid');
        }
    }

}



for (x of numsCont) {
    let numbersArr = [];
    x.addEventListener('click', (e) => {
        e.target.value = '';
        numbersArr.push(x.value);

    })

    x.addEventListener('input', go)
    x.addEventListener('keydown', (e) => {

        if (e.key == 'Backspace') {
            if (e.target.value !== '') {
                e.target.value = '';
            }


            e.target.style.background = 'white'
        }

        if (e.key == 'ArrowLeft') {
            e.target.style.background = 'white';

            let r = e.target.previousElementSibling
            r.focus();
            r.addEventListener('input', (c) => {
                r.value = c.data
            })
        }

        if (e.key === 'ArrowRight') {
            e.target.style.background = 'white';
            let r = e.target.nextElementSibling
            r.focus();
            r.addEventListener('input', (c) => {

                r.value = c.data
                r.nextElementSibling.focus();
            })
        }
        if (e.key === 'Enter') {
            check()
        }
    })


}

re.addEventListener('click', () => {
    for (x of numsCont) {
        x.value = '';
        numsCont[0].focus();
    }
})



btn.addEventListener('click', check)
