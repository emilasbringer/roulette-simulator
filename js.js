const wheel = document.querySelector(".wheel");

let wheelRotation = 0;
let spinning = false;


function spinWheel() {
    if (!spinning) {
        spinning = true; 
        let spin = setInterval(() => {
            wheel.style.transform = "rotate(" + wheelRotation + "deg)";
            wheelRotation += 10;
            if (wheelRotation > 360*10) {
                wheelRotation = 0;
                clearInterval(spin);
                spinning = false;
            }
        }, 1);
    }
}