
'use strict';

// converts a string into the appropriate number of pennies
// valid strings: 432 (432), 213p (213), £16.23p (1623),
// £14 (1400), £54.04 (5404), £23.33333 (2333), 001.41p (141)
// invalid strings: 13x (invalid character),
// 13p.02 (valid character in the wrong position), £p (missing value).
function filterInput(aString) {
    // first check if only the appropriate characters have been used
    if (/[^0-9£p\.]/.test(aString)) {
        throw 'please use only the allowed characters';
    }
    let pounds = '0';
    let pennies = '0';
    if (aString.indexOf('.') > -1) { // input has both pounds and pennies
        [pounds, pennies] = aString.split('.');
    } else if (aString[0] === '£') { // only pounds
        pounds = aString;
    } else { // only pennies
        pennies = aString;
        if (parseInt(pennies) < 10) { // prepend zero for single digits
            pennies = '0' + pennies;
        }
    }
    // cleanup symbols from pounds and pennies
    if (pounds[0] === '£') {
        pounds = pounds.substring(1, pounds.length);
    }
    if (pennies[pennies.length - 1] === 'p') {
        pennies = pennies.substring(0, pennies.length-1);
    }
    // final check for correctness
    if (pounds.length < 1 || pennies.length < 1) {
        throw 'please use the correct format';
    } else if (pennies.length == 1) {
        pennies += '0';
    }
    // convert everything to an integer counting the pennies
    return 100 * parseInt(pounds) + parseInt(pennies.substring(0, 2));
}

// returns the minimum amount of each coin the parameter in pennies needs
// change is an optional parameter if one wishes to change coins or currency
// it is important for the algorith that the array is in descending order
function toChange(
    pennies,
    change = [
        {'toStr': '£2', 'inPennies': 200, 'numberOfCoins': 0},
        {'toStr': '£1', 'inPennies': 100, 'numberOfCoins': 0},
        {'toStr': '50p', 'inPennies': 50, 'numberOfCoins': 0},
        {'toStr': '20p', 'inPennies': 20, 'numberOfCoins': 0},
        {'toStr': '10p', 'inPennies': 10, 'numberOfCoins': 0},
        {'toStr': '5p', 'inPennies': 5, 'numberOfCoins': 0},
        {'toStr': '2p', 'inPennies': 2, 'numberOfCoins': 0},
        {'toStr': '1p', 'inPennies': 1, 'numberOfCoins': 0}
    ]
) {
    change.forEach(function(coin) {
        coin.numberOfCoins = Math.floor(pennies / coin.inPennies);
        if (coin.numberOfCoins > 0) {
            pennies = pennies % coin.inPennies;
        }
    });
    return change;
}

// the "main" of the script
let amount = 0;
const input = document.getElementById('amount');
const calculate = document.getElementById('calculate');
// event listeners
input.onkeyup = function(e) {
    const errors = document.getElementById('errors');
    output.innerHTML = '';
    try {
        amount = filterInput(input.value);
        errors.textContent = '';
        calculate.removeAttribute('disabled')
    } catch(e) {
        errors.textContent = e;
        calculate.setAttribute('disabled', '');
    }
}
calculate.onclick = function(e) {
    const output = document.getElementById('output');
    let total = 0;
    toChange(amount).forEach(function(coin) {
        total += coin.numberOfCoins;
        output.innerHTML += `${coin.toStr}ｘ${coin.numberOfCoins}<br />`;
    });
    output.innerHTML += `The total amount of coins is <b><i>${total}</i></b><br />`;
}