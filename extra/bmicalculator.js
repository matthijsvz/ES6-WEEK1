const bodyMassIndex = function(){
let weight = parseInt(prompt("enter weight in lbs"));
let height = parseInt(prompt("enter height in inches"));
const bmi = weight/(Math.pow(height, 2)) * 703;
alert ("You have a Body Mass Index of " + bmi.toFixed(1) + ".");
}
bodyMassIndex();