const presentCalculation = document.querySelector("#presentCalculation")
let firstNumber= ""
let secondNumber= ""
let pastNumber =""
let op = ""
let result = ""
inicialize()

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
}




document.addEventListener("keydown",(e)=>{
    const key = document.querySelector(`button[value="${e.key}"`)
   
    if(!key && e.key!= "Enter")return
        
    if(e.key in functions){
            if (op == "=" && e.key!="Escape") return
            
            else{
                functions[e.key]()
                }
        }
        
    
    else if(e.key in operators){
        
                    
        if(pastNumber.length==0){
            pastNumber = presentCalculation.textContent
            secondNumber = " "
            op = e.key
            return
        }
        
        else if(pastNumber.length>0 ){
            
            firstNumber = pastNumber
            op = e.key
            secondNumber = presentCalculation.textContent
            result = operators[op](firstNumber, secondNumber)
            presentCalculation.textContent = result
            pastNumber = result
            op = e.key
            
            
        }
        
    }
    
    else{
        if(e.key == "."){
            if(presentCalculation.textContent=='') presentCalculation.textContent+= "0."
            else if (presentCalculation.textContent.indexOf(".")>-1) return
            else presentCalculation.textContent+= "."
        }
        else if (secondNumber == ""){
                
            presentCalculation.textContent+= key.value
        }
        else if(secondNumber!=""){
            presentCalculation.textContent = ""
            presentCalculation.textContent+= key.value
            secondNumber="" 
        }
        
            
    }

})

function inicialize(){
    firstNumber= ""
    secondNumber= ""
    op=""
    presentCalculation.textContent=""
}


function equal() {

    firstNumber = pastNumber
    secondNumber = presentCalculation.textContent
    result = operators[op](firstNumber, secondNumber)
    presentCalculation.textContent = result
    op ="="
    pastNumber=""
    secondNumber=""
}

function backspace(){
    let str = presentCalculation.textContent.substring(0,presentCalculation.textContent.length-1)
    
    presentCalculation.textContent = str
}

