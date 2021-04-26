'use strict'

const API_KEY = 'eb16d74114b07b5f0372';

function onInit() {
    renderSymbolsOptions();
}

function renderSymbolsOptions() {
    const selectFrom = document.querySelector('.from')
    const selectTo = document.querySelector('.to')
    getCurrencySymbol()
        .then(res => res['results'])
        .catch(() => console.log('Somthing wrong'))
        .then(res => Object.keys(res).forEach(key => {
            selectFrom.innerHTML += `<option selected>${key}</option>`
            selectTo.innerHTML += `<option selected>${key}</option>`
        }))
}

function getCurrencySymbol() {
    return axios.get(`https://free.currconv.com/api/v7/currencies?apiKey=${API_KEY}`)
        .then(res => res.data)
        .catch(() => console.log('API KEY IS NOT VALID'))
}

function onConvert(el) {
    let amount = document.querySelector('.amount').value
    let fromSymbol = document.querySelector('.from').value
    let toSymbol = document.querySelector('.to').value
    convert(fromSymbol, toSymbol, amount)
        .then(res => {
            const val = res[`${fromSymbol}_${toSymbol}`]
            document.querySelector('.converted').value = val * amount
        })
}

function convert(fSymbol, tSymbol) {
    return axios.get(`https://free.currconv.com/api/v7/convert?q=${fSymbol}_${tSymbol}&compact=ultra&apiKey=${API_KEY}`)
        .then(res => res.data)
        .catch(() => console.log('oh no'))
}

//'results': {"ILS":{"currencyName":"Israeli New Sheqel","currencySymbol":"₪","id":"ILS"}}

