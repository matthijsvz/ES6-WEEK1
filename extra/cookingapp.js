const gallonsToLiters = function(gallons) {
  return(gallons*3.785411784);
};

const gallons = parseInt(prompt("Enter the amount of gallons to be converted to liters"))

alert(gallonsToLiters(gallons));

const LitersToGallons = function(liters) {
    return(liters*0.264172052);
  };
  
  const liters = parseInt(prompt("Enter the amount of gallons to be converted to liters"))
  
  alert(gallonsToLiters(liters));