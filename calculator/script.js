let display = document.getElementById('display');
function appendToDisplay(input) {
    let operators = ['+', '-', '*', '/'];
    let save = String(display.value);
    out:
    for (let i = 0; i < operators.length; i++) {
        if (input == operators[i]) {
            for (let y = 0; y < operators.length; y++) {
                if (save.charAt(save.length - 1) == operators[y]) {
                    display.value = save.slice(0, save.length-1);
                    break out;
                }
            }
        }
    }
    display.value += input;
}
function cleare() {
    display.value = '';
}
function calculate() {
    try{
        display.value = eval(display.value)
    }
    catch(error){
        display.value=error;
    }
}