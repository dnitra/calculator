const presentCalculation = document.querySelector("#presentCalculation")
let firstNumber= ""
let secondNumber= ""
let pastNumber =""
let op = ""
let result = ""
inicialize()

const operators = {
    
    '=': ()=> {

        firstNumber = pastNumber
        secondNumber = presentCalculation.textContent
        result = operators[op](firstNumber, secondNumber)
        presentCalculation.textContent = result
        op ="="
        pastNumber=""
        secondNumber=""




    },
    'Backspace':()=>{
        let str = presentCalculation.textContent.substring(0,presentCalculation.textContent.length-1)
        presentCalculation.textContent = str
        },
    'Escape':inicialize,

    '+': (a, b) => Number(a) + Number(b), 
    '-': (a, b) => Number(a) - Number(b),
    '*': (a, b) => Number(a) * Number(b), 
    '/': (a, b) => Number(a) / Number(b),
    
};




document.addEventListener("keydown",(e)=>{
    const key = document.querySelector(`button[value="${e.key}"`)
   
    if(!key)return
    if(e.key in operators){
        
        if(e.key == "Escape" || e.key == "Backspace" || e.key == "="){
            if (op == "=" && e.key!="Escape") return
            else{
             operators[e.key]()
            }
            }
        else if(pastNumber.length==0){
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
        if (secondNumber == ""){
            
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

function calculate() {

}

function handleDisplay(){

}
