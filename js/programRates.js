import { percentFormatter } from "./formatters.js"

// Ставки по ипотеке
const programBase = 0.12
const programIt = 0.047
const programGov = 0.067
const programZero = 0.108

// Указваем ставку в радио кнопках
document.querySelector('#base-value').value = programBase
document.querySelector('#it-value').value = programIt
document.querySelector('#gov-value').value = programGov
document.querySelector('#zero-value').value = programZero

// Указываем ставку на табах
document.querySelector('#base-text').innerText = percentFormatter.format(programBase)
document.querySelector('#it-text').innerText = percentFormatter.format(programIt)
document.querySelector('#gov-text').innerText = percentFormatter.format(programGov)
document.querySelector('#zero-text').innerText = percentFormatter.format(programZero)

// Отображение выбранной процетной ставки
const  programInputs = document.querySelectorAll('input[name="program"]')
const totalPercent = document.querySelector('#total-percent')

programInputs.forEach((input) => {
    // Отображение ставки на старте
    if(input.checked) {
        totalPercent.innerText = percentFormatter.format(input.value)
    }

    // Ставка при переключении
    input.addEventListener('click', function () {
        totalPercent.innerText = percentFormatter.format(this.value)
    })
})