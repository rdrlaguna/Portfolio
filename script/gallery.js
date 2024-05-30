

document.addEventListener('DOMContentLoaded', function() {

        // Find all butons
        let clearButtons = document.querySelectorAll('.pj-clear');
        let submitButtons = document.querySelectorAll('.pj-submit');



        //::::::::::::::::::::::::::::::::::::::::::::::::::::::::
        // When a CLEAR button is clicked
        for(let i = 0; i < clearButtons.length; i++){

            clearButtons[i].addEventListener('click', function() {

                // Get button's Id and project name
                let buttonId = clearButtons[i].id;
                let projectName = findProject(buttonId);

                // Find and clear the input field of that project 
                let inputField = findInputField(projectName);
                inputField.value = '';

                deleteOutput(projectName)


            });
        }



        //::::::::::::::::::::::::::::::::::::::::::::::::::::::::
        // When a SUBMIT button is clicked
        for (let i = 0; i < submitButtons.length; i++) {

            submitButtons[i].addEventListener('click', function() {

                // Get buttons Id, project's name and user input
                let buttonId = submitButtons[i].id;
                let projectName = findProject(buttonId);
                let userInput = findInputField(projectName).value;


                // Delete previous output
                deleteOutput(projectName);

                // Create a div to hold the output
                let outputContainer = document.createElement('div');
                outputContainer.id = projectName + "-container";
                outputContainer.className = 'output-container flex-container flex-column flex-center'


                // Find project's output field
                let outputField = document.getElementById(projectName + '-output');

                // Run project's function
                if (projectName === 'mario'){
                    outputContainer = mario(userInput, outputContainer);

                } else if (projectName === 'cash') {
                    outputContainer = cash(userInput, outputContainer);

                } else if (projectName === 'credit'){
                    outputContainer = credit(userInput, outputContainer);

                } else if (projectName === 'readability'){
                    outputContainer = readability(userInput, outputContainer);

                } else {

                }

                // Append the project's results to the output field
                outputField.append(outputContainer);
    
                
            });
        }


});







// :::::::::::::::::::: FUNCTIONS ::::::::::::::::::::

// Finds project's name
function findProject(buttonId) {

    if (buttonId.includes('mario')) {
        return 'mario';
    } else if (buttonId.includes('cash')) {
        return 'cash';
    } else if (buttonId.includes('credit')) {
        return 'credit';
    } else if (buttonId.includes('readability')) {
        return 'readability';
    } else if (buttonId.includes('caesar')) {
        return 'caesar';
    } else {
        return 'substitution';
    }

}



// Finds project's input field
function findInputField(projectName) {

        return document.getElementById(projectName + '-input');
}



// Deletes the output field of the project
function deleteOutput(projectName) {

    // Find project's outputField
    let outputContainer = document.getElementById(projectName + '-container');

    // Remove project's output
    if (outputContainer === null) {
        return;
    } else {
        outputContainer.remove()
    }
}

function insertErrorMessage () {
                        
    let errorMessage = document.createElement('p')
    errorMessage.classList = 'error-message';
    errorMessage.innerHTML = 'TRY AGAIN';

    return errorMessage;
}





// ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
// :::::::::::::::::::: PROJECT FUNCTIONS :::::::::::::::::::::


// ...........................................................
// .................... MARIO ................................
function mario(userInput, outputContainer) {

    // Error checking
    if (userInput <= 0 || userInput > 8) {
        // alert('ERROR: Invalid input.');
        outputContainer.append(insertErrorMessage());
        return outputContainer;
    }

    let row;
    // Print pyramid
    for (let i = 0; i < userInput; i++) {       

        let pyramidRow = document.createElement('p');
        pyramidRow.className = 'pyramid-row';

        row = '';
        for (let j = 0; j < i +1; j++) {

            row += '#';
        }

        pyramidRow.innerHTML = row;
        outputContainer.append(pyramidRow);
    }

    return outputContainer;
}



// ...........................................................
// .................... CASH .................................
function cash(userInput, outputContainer) {

    // Error checking
    if (userInput <= 0 || userInput % 1 !== 0) {
        // alert('ERROR: Invalid input.');
        outputContainer.append(insertErrorMessage());
        return outputContainer;
    }


    let coins = [
        {name: "Quarters", count: 0},
        {name: "Dimes", count: 0},
        {name: "Nickels", count: 0},
        {name: "Pennies", count: 0},
        {name: "Total", count: 0},
    ]
    

    while(userInput > 0) {
        if (userInput >= 25) {
            userInput -= 25;
            coins[0]["count"] += 1;
            coins[4]["count"] += 1;

        } else if (userInput < 25 && userInput >= 10) {
            userInput -= 10;
            coins[1]["count"] += 1;
            coins[4]["count"] += 1; 

        } else if (userInput < 10 && userInput >= 5) {
            userInput -= 5;
            coins[2]["count"] += 1;
            coins[4]["count"] += 1;

        } else {
            userInput -= 1;
            coins[3]["count"] += 1;
            coins[4]["count"] += 1;  
        }
    }

    coins.forEach(coin => {

        // Create a <p> tag for each coin
        let paragraph = document.createElement('p');
        let text = '';
        

        for (let value in coin) {

            if (value === 'name'){
                if (coin[value] != 'Total') {
                    paragraph.classList = 'coins';
                    text += coin[value] + ": "
                } else {
                    paragraph.classList = 'total-coins';
                    text += coin[value] + ": "
                }
            } else {
                text += coin[value];
            }
        }

        paragraph.innerHTML = text;
        outputContainer.append(paragraph);

    })


    return outputContainer;
}




// ...........................................................
// .................... CREDIT ...............................
function credit(userInput, outputContainer) {

    // Find the first two digits of the card   
    const input = userInput.split("");
    const length = userInput.toString().length

    // ERROR CHECKING 
    if (length < 13 || length >16) {
        // alert('ERROR: Invalid input.');
        outputContainer.append(insertErrorMessage());
        return outputContainer;
    }


    // Check credit card's validity
    let cardChecksum = (calculateChecksum(input, length));
    

    // Print card type
    let cardType = calculateCardType(cardChecksum, input, length);
    let pTag = document.createElement('p');
    if (cardType === 'INVALID') {
        pTag.className = "invalid-card";
    } else {
        pTag.className = "valid-card";
    }

    pTag.innerHTML = cardType;
    outputContainer.append(pTag);
    return outputContainer;
    

}



// Calculates card's CHECKSUM
function calculateChecksum(input, len) {


    // Calculate first sum
    let firstSum = 0;
    
    for (let i = len - 2; i >= 0; i -= 2) {
        
        // Multiply by 2 every second number starting from the second last
        let product = input[i] * 2;

        // Add product's digits when product > 9
        if (product > 9) {

            let productArray = product.toString().split("")

            for (k = 0; k < productArray.length; k++) {
                let digit = productArray[k];
                firstSum += parseInt(digit);
            }
        } else {
            firstSum += product;
        }
    }

   
    // Calculate second sum
    // Add every second number starting from the last
    let secondSum = 0;
    for (let j = len - 1; j >= 0; j -= 2) {

        let digit = input[j]
        secondSum += parseInt(digit);

    }

    // Return validity of checksum
    return (firstSum + secondSum) % 10;
}



// Selects the card's type if checksum is right
function calculateCardType(checksum, input, len) {

    const cardStart = [input[0], input[1]];
    const start = cardStart.join('');

    if (checksum !== 0)
    {
        return 'INVALID';
    }
    
    
    switch (true) {

        case (len === 15 && (start == 34 || start == 37)):
            return 'AMERICAN';
        
        case (len === 16 && start >= 51 && start <= 55):
            return 'MASTERCARD';

        case ((len === 13 || len === 16) && start >= 40 && start <= 49):            
            return 'VISA';
        
        default:
            return 'INVALID';
    }

}




// ...........................................................
// .................... READABILITY ..........................
function readability(userInput, outputContainer) {

}