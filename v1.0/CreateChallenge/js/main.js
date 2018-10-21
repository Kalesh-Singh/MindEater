

function validateQuestion(){
    var question = document.getElementById("question");
    var option1 = document.getElementById("option1");
    var option2 = document.getElementById("option2");
    var option3 = document.getElementById("option3");
    var solution = document.getElementById("solution");
    var hint = document.getElementById("hint");
    var explanation = document.getElementById("explanation");
    var check = true;
    if (question.value.trim() === ""){
        showValidate(question);
        check=false;
    }
    else {
        hideValidate(question);
    }
    
    if (option1.value.trim() === ""){
        showValidate(option1);
        check=false;
    }
    else {
        hideValidate(option1);
    }
    
    if (option2.value.trim() === ""){
        showValidate(option2);
        check=false;
    }
    else {
        hideValidate(option2);
    }
    
    if (option3.value.trim() === ""){
        showValidate(option3);
        check=false;
    }
    else {
        hideValidate(option3);
    }
    
    if (solution.value.trim() === ""){
        showValidate(solution);
        check=false;
    }
    else {
        hideValidate(solution);
    }
    
    if (hint.value.trim() === ""){
        showValidate(hint);
        check=false;
    }
    else {
        hideValidate(hint);
    }
    
    if (explanation.value.trim() === ""){
        showValidate(explanation);
        check=false;
    }
    else {
        hideValidate(explanation);
    }
    return check;
}

function validateChallenge() {
    var title = document.getElementById("title");
    var description = document.getElementById("description");
    var check = true;
    if (title.value.trim() === ""){
        showValidate(title);
        check=false;
    }
    else {
        hideValidate(title);
    }
    
    if (description.value.trim() === ""){
        showValidate(description);
        check=false;
    }
    else {
        hideValidate(description);
    }
    
    if (check){
        window.open("create_question.html");
    }
    
    return check;
}

var inputs = document.getElementsByClassName("input1");
console.log(inputs.length);
var i;
for (i = 0; i < inputs.length; i++) {
    hideValidate(inputs[i]);
}

function showValidate(input) {
    var thisAlert = input.parentNode;

    thisAlert.classList.add("alert-validate");
}

function hideValidate(input) {
    var thisAlert = input.parentNode;

    thisAlert.classList.remove("alert-validate");
}


