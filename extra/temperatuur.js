const temperature = function(){
let fahrenheit = parseInt(prompt("enter the temperature in Fahrenheit"));

const result = (fahrenheit - 32) * .5556;
alert ("Your temperature in Celsius is " + result.toFixed(1) + "\xB0.");
}
temperature();