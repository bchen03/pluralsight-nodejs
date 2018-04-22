// Accept input from command line

let lines = []

process.stdin.on("data", text => {
    let textString = text.toString().trim();

    if (textString === "quit") {
        process.exit(0)
    }

    if (textString === "list") {
        for (let i = 0; i < lines.length; i++) {
            console.log(`${i}: ${lines[i]}`)
        }
    }
    else if (!!textString) {
        lines.push(textString)
    }
})

let help = process.argv.slice(2,3)
if (help.length > 0 && help[0].trim() === "/?") {
    console.log("\n==> input.js\nSave input in a buffer\n\nlist\t\tTo dump contents of buffer\nquit\t\tTo end program\n")    
    process.exit(0)
}
    
