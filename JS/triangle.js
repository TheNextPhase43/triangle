'use strict';

function Triangle(elClass) {
    this.elSelector = `.` + elClass;
    this.el = document.querySelector(this.elSelector);
    this.lenghtFields = this.el.querySelectorAll(`.panel > div > input`);
    this.createButton = this.el.querySelector(`.panel > div > .create-button`);
    this.clearButton = this.el.querySelector(`.panel > div > .clear-button`);
    this.triangleCanvas = this.el.querySelector(`.triangle-space > canvas`);
    this.propsFields = this.el.querySelectorAll(`.panel > div > span`);
    this.colorSelector = this.el.querySelector(`.panel > div > .color-select > select`);
    this.colorIcon = this.el.querySelector(`.panel > div > .color-select > .color-icon`);

    let ctx = this.triangleCanvas.getContext(`2d`);
    let cw = this.triangleCanvas.width, startWidthPos = cw / 2 - 100;
    let ch = this.triangleCanvas.height, startHeightPos = ch / 2 + 50;

    this.launchThePanel = function () {
        this.createButton.addEventListener('click', () => {
            this.createTriangle();
        });
        this.clearButton.addEventListener('click', () => {
            this.clearFields();
        });
        this.colorSelector.addEventListener('change', () => {
            this.colorIcon.style.background = this.colorSelector.value;
        });
    }


    this.createTriangle = function () {
        let a = this.lenghtFields[0].value * 37.938105;
        let b = this.lenghtFields[1].value * 37.938105;
        let c = this.lenghtFields[2].value * 37.938105;
        startWidthPos = cw / 2 - 100;
        startHeightPos = ch / 2 + 50;
        ctx.clearRect(0, 0, cw, ch);
        for (let i = 0; i < this.propsFields.length; i++) this.propsFields[i].innerHTML = ``;

        if (a >= b + c || b >= a + c || c >= a + b) {
            setTimeout(() => { window.alert(`Incorrect values!`) }, 1);
        } else {
            this.runAnalysis();
            if (this.lenghtFields[0].value > 5) startWidthPos -= 75;
            if (this.lenghtFields[1].value > 7 || this.lenghtFields[2].value > 7) startHeightPos += 50;

            let angleC = Math.acos((c * c - a * a - b * b) / (2 * a * b));
            let x1 = startWidthPos;
            let y1 = startHeightPos;
            let x2 = startWidthPos + a;
            let y2 = startHeightPos;
            let x3 = startWidthPos - b * Math.cos(angleC);
            let y3 = startHeightPos - b * Math.sin(angleC);
            ctx.beginPath();
            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);
            ctx.lineTo(x3, y3);
            ctx.closePath();
            ctx.fillStyle = this.colorSelector.value;
            ctx.fill();
        }
    }

    this.runAnalysis = function () {
        let lenghts = [];

        let perimeter = 0;
        for (let i = 0; i < this.lenghtFields.length; i++) {
            perimeter += Number(this.lenghtFields[i].value);
            lenghts.push(Number(this.lenghtFields[i].value));
        }
        this.propsFields[0].innerHTML = `Perimeter: ${perimeter}cm`;

        let halfP = perimeter / 2;
        let triangleHeight = 2 / lenghts[0] * Math.sqrt(halfP * (halfP - lenghts[0]) * (halfP - lenghts[1]) * (halfP - lenghts[2]));
        this.propsFields[1].innerHTML = `Area: ${(lenghts[0] * triangleHeight / 2).toFixed(2)}cm`;
    }

    this.clearFields = function () {
        ctx.clearRect(0, 0, cw, ch);
        for (let i = 0; i < this.propsFields.length; i++) this.propsFields[i].innerHTML = ``;
        for (let i = 0; i < this.lenghtFields.length; i++) this.lenghtFields[i].value = ``;
    }

    this.launchThePanel();
}