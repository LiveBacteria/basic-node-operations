const fs = require('fs');

function done(output){
    process.stdout.write(output);
    process.stdout.write('\nprompt > ');
}

function evaluateCmd(userInput){
    const userInputArray = userInput.split(" "),
        command = userInputArray[0];
    let option;
    if(userInputArray[1]){const option = userInputArray[1]}

    switch(command) {
        case "echo":
            commandLibrary.echo(userInputArray.slice(1).join(" "));
            break;
        case "cat":
            commandLibrary.cat(userInputArray.slice(1));
            break;
        case "head":
            (option != undefined) ? commandLibrary.head(userInputArray.slice(1), option) : commandLibrary.head(userInputArray.slice(1));
            break;
        case "tail":
            break;
        default:
            done( "'"+ userInput + "' is not a command. ");
            break;
    }
}

const commandLibrary = {
    "echo": (userInput) => {
        done(userInput);
    },
    "cat": (fullPath) => {
        const fileName = fullPath[0];
        fs.readFile(fileName, (err, data) => {
            if(err){throw new Error(err);}
            done(data);
        });
    },
    "head": (fullPath, count) => {

        // Checks if count was given as a parameter otherwise it assigns it to 2
        if(!count){let count = 2;}

        // Sets a constant variable fileName equal to the filename passed into the function
        const fileName = fullPath[0];

        // Declares an array to hold the returned data that will evenutally be join back as a string.
        let resultArray;

        // This callback fed function takes the returned data which is the first Nth(count) lines of the file given
        fs.readFile(fileName, (err, data) => {

            // Parses the returned data object to a string and calls the split method on it
            let fileToString = data.toString().split("\n");

            if(err){throw new Error(err);}

            // Assigns the result array each value of file to string up to count
            for(let x = 0; x < count; x++){
                count > 0 ? resultArray.push(fileToString[x]) : resultArray.push( "\n" + fileToString[x]);
            }

            // Calls the done function with the result of the resultArray array being joined on each '\n', new line, character
            done(resultArray.join("\n"));
        });
    }
};

module.exports.commandLibrary = commandLibrary;
module.exports.evaluateCmd = evaluateCmd;