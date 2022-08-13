const presentCalculation = document.querySelector("#presentCalculation")
const pastCalculation = document.querySelector("#pastCalculation")
const buttons = document.querySelectorAll("button")
let firstNumber= null
let secondNumber= null
let result = null
let op = ""
let check = true

const operators = {

    '+': (a, b) => Number(a) + Number(b), 
    '-': (a, b) => Number(a) - Number(b),
    '*': (a, b) => Number(a) * Number(b), 
    '/': (a, b) => Number(a) / Number(b),
};

const functions={
    '=': equal,
    "Enter": equal,
    'Backspace':backspace,
    'Escape':inicialize,
    ".":addDot
}

buttons.forEach(button=>button.addEventListener("click",e=>userInput(e.target.value)))

document.addEventListener("keydown",(e)=>userInput(e.key))

function inicialize(){
    firstNumber= null
    secondNumber= null
    result=null
    op=""
    presentCalculation.textContent= ""
    check= true
}


function equal() {
    if(op=="=") return
    firstNumber = result
    secondNumber = presentCalculation.textContent
    result = operators[op](firstNumber, secondNumber)
    presentCalculation.textContent = result
    op ="="
    check = false
}

function backspace(){
    let str = presentCalculation.textContent.substring(0,presentCalculation.textContent.length-1)
    
    presentCalculation.textContent = str
}

function addDot(){
    if(presentCalculation.textContent=='') presentCalculation.textContent+= "0."
    else if (presentCalculation.textContent.indexOf(".")>-1 ||op=="=") return
    else presentCalculation.textContent+= "."
}

function addNumber(num){
    if (op == "=")return
        else if(!check){
            presentCalculation.textContent = ""
            presentCalculation.textContent+= num
            check=true
        }
        else if (check){      
            presentCalculation.textContent+= num   
        }
}
function calculate(operator){
    if(result == null){
        result = presentCalculation.textContent
        op = operator
        check = false
             
    }
    
    else if(result !== null){
        if (op == "=") {
            op = operator
            return}
        
        firstNumber = result
        secondNumber = presentCalculation.textContent
        result = operators[op](firstNumber, secondNumber)
        presentCalculation.textContent = result
        op = operator
        check = false
        
    }
}

function userInput(pressedButton){
    if(pressedButton in functions) functions[pressedButton]()      
        
    else if(pressedButton in operators) calculate(pressedButton)
    
    else if(parseInt(pressedButton)) addNumber(pressedButton)
}