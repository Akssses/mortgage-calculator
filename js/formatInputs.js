import { priceFormatter } from "./formatters.js"

// Ищем инпуты
const inputCost = document.querySelector('#input-cost')
const inputDownPayment = document.querySelector('#input-downpayment')
const inputTerm = document.querySelector('#input-term')

const form = document.querySelector('#form')
const totalCost = document.querySelector('#total-cost')
const totalMonthPayment = document.querySelector('#total-month-payment')

// Опции cleave
const cleavePriceSetting = {
    numeral: true,
    numberThousandsGroupStyle: 'thousand',
    delimiter: ' '
}


// Форматирование cleave
const cleaveCost = new Cleave(inputCost, cleavePriceSetting)
const cleaveDownPayment = new Cleave(inputDownPayment, cleavePriceSetting)
const cleaveTerm = new Cleave(inputTerm, cleavePriceSetting)


// Стартовая сумма кредита
calcMartgage()

// Отображение и расчет суммы ипотеки
form.addEventListener('input', function() {
    // Расчет суммы кредита
    calcMartgage()

})

function calcMartgage() {
    // Общая сумма кредита
    const totalAmount = +cleaveCost.getRawValue() - cleaveDownPayment.getRawValue()
    totalCost.innerText = priceFormatter.format(totalAmount)

    // Ставка по кредиту
    const creditRate = document.querySelector('input[name="program"]:checked').value
    const monthRate = creditRate / 12

    // Срок ипотеки в годах
    const years = +cleaveTerm.getRawValue()

    // Срок ипотеки в месяцах
    const months = years * 12

    // Расчет ежемесячного платежа
    const monthPayment = (totalAmount * monthRate) / 1 - (1 + monthRate) * (1 - months)
    totalMonthPayment.innerText = priceFormatter.format(monthPayment)
    console.log(monthPayment)
}


// Slider cost 
const sliderCost = document.getElementById('slider-cost');

noUiSlider.create(sliderCost, {
    start: 12000000,
    connect: 'lower',
    tooltips: true,
    step: 100000,
    range: {
        'min': 375000,
        '50%': [10000000, 1000000],
        'max': 100000000
    },
    format: wNumb({
        decimals: 0,
        thousand: ' ',
        suffix: '',
    })
});

sliderCost.noUiSlider.on('update', function() {
    const sliderValue = parseInt(sliderCost.noUiSlider.get(true))
    cleaveCost.setRawValue(sliderValue)
    calcMartgage()
})


// Slider downpayment
const sliderDownpayment = document.getElementById('slider-downpayment')

noUiSlider.create(sliderDownpayment, {
    start: 5000000,
    connect: 'lower',
    tooltips: true,
    step: 100000,
    range: {
        'min': 375000,
        '50%': [10000000, 1000000],
        'max': 100000000
    },
    format: wNumb({
        decimals: 0,
        thousand: ' ',
        suffix: '',
    })
});

sliderDownpayment.noUiSlider.on('update', function() {
    const sliderValue = parseInt(sliderDownpayment.noUiSlider.get(true))
    cleaveDownPayment.setRawValue(sliderValue)
    calcMartgage()
})


// Slider Years
const sliderTerm = document.getElementById('slider-term')

noUiSlider.create(sliderTerm, {
    start: 1,
    connect: 'lower',
    tooltips: true,
    step: 1,
    range: {
        'min': 1,
        'max': 30
    },
    format: wNumb({
        decimals: 0,
        thousand: ' ',
        suffix: '',
    })
});

sliderTerm.noUiSlider.on('update', function() {
    const sliderValue = parseInt(sliderTerm.noUiSlider.get(true))
    cleaveTerm.setRawValue(sliderValue)
    calcMartgage()
})


// Форматирование inputCost

inputCost.addEventListener('input', function() {
    const value = +cleaveCost.getRawValue()
    if (value > 100000000) {
        inputCost.closest('.param__details').classList.add('param__details--error')
    } 

    if (value <= 100000000) {
        inputCost.closest('.param__details').classList.remove('param__details--error')
    } 
})