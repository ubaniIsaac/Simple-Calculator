const calculator = document.querySelector('.calculator')
const keys = calculator.querySelector('.calculator__keys')
const display = document.querySelector('.calculator__display')


keys.addEventListener('click', e => {
    if (e.target.matches('button')) {
        // console.log(e.target.)
        const key = e.target
        const action = key.dataset.action
        const keyContent = key.textContent
        let displayedNum = display.textContent
        const previousKeyType = calculator.dataset.previousKeyType

        //Calculate Function
        const calculate = (n1, operator, n2) => {
            const firstNum = parseFloat(n1)
            const secondNum = parseFloat(n2)

            if (operator === 'add') return firstNum + secondNum

            if (operator === 'subtract') return firstNum - secondNum

            if (operator === 'multiply') return firstNum * secondNum

            if (operator === 'divide') return firstNum / secondNum
        }

        // //Remove .is-depressed class from all keys
        Array.from(key.parentNode.children)
            .forEach(k => k.classList.remove('is-depressed'))




        //Number keys
        if (!action) {
            if (displayedNum === '0' || previousKeyType === 'operator' || previousKeyType === 'calculate') {
                display.textContent = keyContent
            } else {
                display.textContent = displayedNum + keyContent
            }

            calculator.dataset.previousKeyType = 'number'
        }


        //Decimal key
        if (action === 'decimal') {
            if (previousKeyType === 'operator' || previousKeyType === 'calculate') {
                display.textContent = '0.'
            } else if (!displayedNum.includes('.')) {
                display.textContent = displayedNum + '.'
            }

            calculator.dataset.previousKeyType = 'decimal'
        }


        //Operator keys
        if (action === 'add' ||
            action === 'subtract' ||
            action === 'multiply' ||
            action === 'divide'
        ) {
            const firstValue = calculator.dataset.firstValue
            const operator = calculator.dataset.operator
            const secondValue = displayedNum

            //add .is-depressed class to operator when clicked 
            key.classList.add('is-depressed')

            calculator.dataset.previousKeyType = 'operator'

            // save displayed number 
            calculator.dataset.firstValue = displayedNum

            // store action
            calculator.dataset.operator = action

            // 
            if (firstValue && operator && previousKeyType !== 'operator' && previousKeyType !== 'calculate' && previousKeyType !== 'negative') {
                const calcValue = calculate(firstValue, operator, secondValue)
                display.textContent = calcValue

                //Update calculated value as firstValue
                calculator.dataset.firstValue = calcValue
            } else {
                //If no calculations, set displayed number as firstValue
                calculator.dataset.firstValue = displayedNum
            }

        }


        if (action !== 'clear') {
            const clearButton = calculator.querySelector('[data-action=clear]')
            clearButton.textContent = 'CE'
        }


        if (action === 'clear') {
            if (key.textContent === 'AC') {
                calculator.dataset.firstValue = ''
                calculator.dataset.modValue = ''
                calculator.dataset.operator = ''
                calculator.dataset.previousKeyType = ''
            } else {
                key.textContent = 'AC'
            }

            display.textContent = 0
            calculator.dataset.previousKeyType = 'clear'
        }

        if (action === 'delete') {
            if (displayedNum !== '0') {
                let arr = Array.from(displayedNum)
                if (arr.length === 1) {
                    display.textContent = '0'
                } else {
                    const del = () => {
                        arr.pop()
                        arr = arr.join('')
                        return arr
                    }
                    del()

                    // console.log(back)
                    display.textContent = arr
                }
            }
        }


        if (action === 'negative') {
            let value = displayedNum
            calculator.dataset.previousKeyType = 'negative'

            display.textContent = value / -1

        }

        if (action === 'percentage') {
            let value = displayedNum
            calculator.dataset.previousKeyType = 'negative'

            display.textContent = value / 100

        }




        //Calculate Key
        if (action === 'calculate') {
            let firstValue = calculator.dataset.firstValue
            const operator = calculator.dataset.operator
            let secondValue = displayedNum
            calculator.dataset.previousKeyType = 'calculate'


            if (firstValue) {


                if (previousKeyType === 'calculate') {
                    firstValue = displayedNum
                    secondValue = calculator.dataset.modValue
                }

                display.textContent = calculate(firstValue, operator, secondValue)
            }

            calculator.dataset.modValue = secondValue

        }



    }
})