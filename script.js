const presentCalculation = document.querySelector("#presentCalculation")


const add = function(a,b) {
	return parseInt(a)+parseInt(b)
};

const subtract = function(a,b) {
	return parseInt(a)-parseInt(b)
};


const multiply = function(a,b) {
  
  return parseInt(a)*parseInt(b)
};

document.addEventListener("keydown",(e)=>{
    const key = document.querySelector(`button[data-key="${e.keyCode}"`)
    if(e.shiftKey)console.log(e.shiftKey)
    if(!key)return
    console.log(key.value)
    console.log(e.keyCode)

    if(presentCalculation.textContent.length<=21) presentCalculation.textContent+= key.value

})