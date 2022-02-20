const wheel = document.querySelector(".wheel-texture");
const bankValue = document.querySelector(".bankValue");
const betValue = document.querySelector(".betValue");
const spinSpeedSlider = document.querySelector(".spin-speed")
const martingaleButton = document.querySelector(".martingale-button");
const coomButton = document.querySelector(".coom-button");
const info = document.querySelector(".info");
const hitValue = document.querySelector(".hit-value");
const main = document.querySelector(".main");
const coomItem = document.querySelector(".coom-item");

let wheelRotation = 0;
let spinning = false;
let bet = 0;
let bank = 1000;
let previousBet = 0;
let result;
let megaBetBoolean = false;
let interval;
let rebetThisTurn = false;
let spinSpeed = 10;
let martingaleBoolean = false;
let martinBet = 5;
let wonSpin = false;
let madeBet = false;
let coomCreated = false;
let coomed = false;
let element;


setInterval(() => {
    
    if (martingaleBoolean) {
        if (!madeBet) {
            betAmmount(martinBet);
            madeBet = true;
            spinWheel();
        }
        if (!spinning && !wonSpin) {
            martinBet *= 2;
            madeBet = false;
        }
        if (!spinning && wonSpin) {
            martinBet = 5;
            madeBet = false;
        }
    }
}, 100);

function coom() {
    if (!coomCreated) {
        element = document.createElement("div")
        coomItem.appendChild(element);
        element.style.width = "100%";
        element.style.height = "100%";
        element.style.background = "white";
        element.style.zIndex = "50";
        element.style.position = "absolute";
        coomCreated = true;
    }
    if (coomed) {
        element.style.display = "none";
        coomed = false;
    }
    else {
        element.style.display = "block";
        coomed = true;
    }
}

function resetBank() {
    bank = 1000;
    bankValue.innerHTML = bank;
}

function aidsBlinker(inputBool) {
    let redOrGreen = inputBool
    let blinkInteger = 0;
    let interval = setInterval(() => {
        if (blinkInteger%2 == 0 && redOrGreen) {
            info.style.background =  "rgba(143, 50, 50, 0.603)";
            blinkInteger++;
            console.log("red");
        }
        else if (blinkInteger%2 == 0 && !redOrGreen){
            info.style.background = "rgba(50, 143, 63, 0.603)";
            blinkInteger++;
            console.log("green");
        }
        else {
            info.style.background = "rgba(40, 90, 47, 0.329)";
            blinkInteger++;
            console.log("None");
        }
        if (blinkInteger > 3) {
            clearInterval(interval);
        }
    }, 50);
}

function switchMartingale() {
    if (martingaleBoolean) {
        martingaleBoolean = false;
        martingaleButton.style.background = '#863535';
        martingaleButton.innerHTML = "Disabled";
    }
    else {
        martingaleBoolean = true;
        martingaleButton.style.background = '#367e24';
        martingaleButton.innerHTML = "Enabled";
    } 
}


function setSpinSpeed() {
    spinSpeed = 10 * spinSpeedSlider.value/100
}


function spinWheel() {
    if (!spinning) {
        spinning = true; 
        let spin = setInterval(() => {
            wheel.style.transform = "rotate(" + wheelRotation + "deg)";
            wheelRotation += spinSpeed;
            if (wheelRotation > 3600) {
                wheelRotation = 0;
                wheel.style.transform = "rotate(" + wheelRotation + "deg)";
                clearInterval(spin);
                spinning = false;
                result = Math.floor(Math.random() * 37);
                rebetThisTurn = false;
                hitValue.innerHTML = result;
                if (result%2 == 0 && !result == 0) {
                    bank += bet*2;
                    previousBet = bet;
                    bet = 0;
                    betValue.innerHTML = bet;
                    bankValue.innerHTML = bank
                    wonSpin = true;
                    aidsBlinker(false);
                }
                else {
                    wonSpin = false;
                    previousBet = bet;
                    bet = 0;
                    betValue.innerHTML = bet
                    aidsBlinker(true);
                }
                document.title = "Roulette Simulator " + bank;
            }
        }, 1);
    }
}

function clearBet() {
    bank += bet;
    bet = 0;
    betValue.innerHTML = bet;
    bankValue.innerHTML = bank;
}

function doubleBet() {
    if (bet < bank) {
        bank -= bet;
        bet *= 2;
        betValue.innerHTML = bet;
        bankValue.innerHTML = bank;
    }
}

function reBet() {
    if (previousBet < bank && !rebetThisTurn && previousBet != 0) {
        bet = previousBet;
        bank -= bet;
        betValue.innerHTML = bet;
        bankValue.innerHTML = bank;
        rebetThisTurn = true;
    }
    else if (previousBet != 0)  doubleBet();
}

function betAmmount(ammount) {
    if (ammount <= bank) {
        bank -= ammount;
        bet += ammount;
        betValue.innerHTML = bet;
        bankValue.innerHTML = bank;
    }
}

function megaBet(ammount) {
    megaBetBoolean = true;
    console.log("MegaBetting");
    inteval = setInterval(() => {
        if (megaBetBoolean && ammount <= bank) {
            console.log("bet");
            bet += ammount;
            bank -= ammount;
            betValue.innerHTML = bet;
            bankValue.innerHTML = bank;
        }
    }, 1); 
    
}

function stopMegaBet() {
    console.log("Stopped MegaBetting");
    clearInterval(inteval);
    megaBetBoolean = false;
}

function keyDown(event) {
    let code = event.keyCode;
    if (code == 49) {betAmmount(5);}
    if (code == 50) {betAmmount(50);}
    if (code == 51) {betAmmount(100);}
    if (code == 52) {betAmmount(500);}
    if (code == 53) {betAmmount(1000);}
    if (code == 13 || code == 32) {spinWheel();}
}

function keyUp(event) {
    let code = event.keyCode;
}