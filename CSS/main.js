const Spinnig = function (el) {
    this.el = el;
    this.containerEl = null;

    this.circleColors = ["#c16ea4", "#c1267d", "#d1a0be", "#913887"];

    this._setupElements();
    this._renderCircles();
};

Spinnig.prototype._setupElements = function () {
    const containerEl = document.createElement("div");

    containerEl.classList.add("main");
    this.el.appendChild(containerEl);
    this.containerEl = containerEl;
};

Spinnig.prototype._randomlySetKeyframes = function (index) {
    const trajectorySize = Math.random() * 200 + 150;
    const animationName = `rotation_${index}`;

    const css = window.document.styleSheets[0];
    css.insertRule(`
        @keyframes ${animationName} {
            0% {
                transform: rotate(0deg) translate(-${trajectorySize}px);
            }
            100% {
                transform: rotate(360deg) translate(-${trajectorySize}px);
            }
        }
    `);
    return animationName;
};

Spinnig.prototype._renderCircles = function () {
    Array.from({ length: 25 }, () => 0).map((value, index) => {
        const speed = Math.floor(Math.random() * 30 + 10) + "s";
        const circleSize = Math.random() * 8 + 2 + "px";
        const circleBackground =
            this.circleColors[
                Math.floor(Math.random() * this.circleColors.length)
            ];

        const animationName = this._randomlySetKeyframes(index);
        value = document.createElement("div");
        value.classList.add("circle");
        value.style.width = circleSize;
        value.style.height = circleSize;
        value.style.animation = `${animationName} ${speed} linear infinite`;
        value.style.backgroundColor = circleBackground;

        this.containerEl.appendChild(value);
    });
};

window.spinning = new Spinnig(document.querySelector(".js-container"));
