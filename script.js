const presentCalculation = document.querySelector("#presentCalculation")
const pastCalculation = document.querySelector("#pastCalculation")
const buttons = document.querySelectorAll("button")
let firstNumber= null
let secondNumber= null
let result = null
let op = ""
let check = true
const rounded = 1000

const operators = {
   
    '+': (a, b) => Math.round((Number(a) + Number(b))*rounded)/rounded, 
    '-': (a, b) => Math.round((Number(a) - Number(b))*rounded)/rounded,
    '*': (a, b) => Math.round((Number(a) * Number(b))*rounded)/rounded, 
    '/': (a, b) => Math.round((Number(a) / Number(b))*rounded)/rounded,
};

const functions={
    '=': equal,
    "Enter": equal,
    'Backspace':backspace,
    'Escape':inicialize,
    'c':inicialize,
    '.':addDot,
    '±':changePlusMinus,
    '%':percentage
}

buttons.forEach(button=>button.addEventListener("click",e=>userInput(e.target.value)))

document.addEventListener("keydown",(e)=>userInput(e.key))


function userInput(pressedButton){
    if(pressedButton in functions) functions[pressedButton]()      
        
    else if(pressedButton in operators) calculate(pressedButton)
    
    else if(Number(pressedButton)||pressedButton=="0") addNumber(pressedButton)

   
}

function calculate(operator){
    if(result == null){
        result = presentCalculation.textContent
        op = operator
        check = false
        pastDisplay(result,null,op)
             
    }
    
    else if(result !== null){
        if (op == "=") {
            op = operator
            pastDisplay(result,null,op)
            return}
        
        firstNumber = result
        secondNumber = presentCalculation.textContent
        result = operators[op](firstNumber, secondNumber)
        
        presentCalculation.textContent = result
       
        
        op = operator
        pastDisplay(result,null,op)
        check = false

        
        
    }
}

function inicialize(){
    firstNumber= null
    secondNumber= null
    result=null
    op=""
    presentCalculation.textContent= ""
    pastCalculation.textContent= ""
    check= true
}


function equal() {
    if(op=="=") return
    firstNumber = result
    secondNumber = presentCalculation.textContent
    result = operators[op](firstNumber, secondNumber)
    presentCalculation.textContent = result

    pastDisplay(firstNumber,secondNumber,op)

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
    if (op == "=" || presentCalculation.textContent=="0")return
    else if(!check){
        presentCalculation.textContent = ""
        presentCalculation.textContent+= num
        check=true
    }
    else if (check){      
        presentCalculation.textContent+= num   
    }
}

function pastDisplay(num1,num2,operator){
    
    operator = changeOperator(operator)
    if(num2==null) {
        pastCalculation.textContent = num1 + " "+operator}

    else{pastCalculation.textContent = num1 + " "+operator+" " + num2 + " =" }
}

function changeOperator(operator){
    if (operator == "*")return "×"
    else if (operator == "/") return "÷"
    else return operator
}
function changePlusMinus(){
    presentCalculation.textContent = 
    (Number(presentCalculation.textContent)*(-1)).toString()
}

function percentage(){
    presentCalculation.textContent = 
    (Number(presentCalculation.textContent)*(0.01)).toString()
}