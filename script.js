function to_display(character) {
    console.log(to_display);
    let on_display = document.getElementById("id_display").value;
    on:dispaly = on_display + character.value;
    document.getElementById("id_display").value = on_display;
}

let expression = "";

function operator(character) {
    console.log(operator);
    let on_display = document.getElementById("id_display").value;
    expression = expression + on_display + character.value;
    document.getElementById(id_display).value = "";
    console.log(expression);
}
