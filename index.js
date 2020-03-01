// TASK
// given a number and an rgba code, return (as an array) the *hex* colours that take you 
// from that colour to white (ie #ffffff, or rgba(255, 255, 255)), in the number of steps given

const doColoursFunction = document.querySelector('.colours-form')
const colourPanel = document.querySelector(".colour-panel")
const body = document.querySelector('body')

const handleSubmit = e => {
    e.preventDefault(e)
    number = e.target[0].value
    startColour = e.target[1].value
    colours(number, startColour)
}
doColoursFunction.addEventListener("submit", handleSubmit)

// ---- functions ---- //

const colours = (number, startColour) => {
    while (colourPanel.firstChild) {
        colourPanel.removeChild(colourPanel.firstChild)
    }
    let rgbArray = hexToRgb(startColour).replace(/[rgba() ]/g, "").split(/,/g)
    let r =  parseInt(rgbArray[0])
    let g =  parseInt(rgbArray[1])
    let b =  parseInt(rgbArray[2])

    rArray = churnColoursOut(r, (255 - r)/number)
    gArray = churnColoursOut(g, (255 - g)/number)
    bArray = churnColoursOut(b, (255 - b)/number)
    
    let answer = []
        for (i=0; i<=number; i++) {
            let newColour = `rgba(${rArray[i]}, ${gArray[i]}, ${bArray[i]})`
            createDiv(newColour, number)
            answer.push(newColour)
        }
    console.log(answer)
    return answer
}

const createDiv = (colour, number) => {
    let newDiv = document.createElement("div")
    newDiv.style.backgroundColor=`${colour}`
    newDiv.style.height=`${window.innerHeight / (parseInt(number) + 1)}px`
    colourPanel.appendChild(newDiv)
}

const churnColoursOut = (start, increment) => {
    let coloursArray = []
    for (i=start; i<255.5; i=i+increment) {
        coloursArray.push(Math.round(i))
    } 
    return coloursArray
}

// ---- RGB to Hex (171, 205, 239 to #abcdef) ---- //
const componentToHex = c => {
    var hex = parseInt(c).toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}
const rgbaToHex = rgba => {
    let rgbArray = rgba.replace(/[rgba() ]/g, "").split(/,/g)
    return '#' + componentToHex(rgbArray[0]) + componentToHex(rgbArray[1]) + componentToHex(rgbArray[2])
}

// ---- Hex to RGB (#abcdef to 171, 205, 239 ) ---- //
const hexToRgb = hex => {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return ( `rgba(${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)})` )
  }
  

