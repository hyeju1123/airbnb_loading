const Spinnig = function (el) {
    this.el = el;
    this.containerEl = null;

    this.circleColors = ["#c16ea4", "#c1267d", "#d1a0be", "#913887"];

    this._setupElements();
    this._renderCircles();

    // setTimeout(() => {
    //     this._fadeOutCard();
    // }, 5000);
};

Spinnig.prototype._setupElements = function () {
    const containerEl = document.createElement("div");

    containerEl.classList.add("main");
    this.el.appendChild(containerEl);
    this.containerEl = containerEl;
};

Spinnig.prototype._firstLoop = function (index) {
    const animationInfo = {
        trajectorySize: Math.random() * 200 + 150,
        animationName: `rotation_${index}`,
    };

    const css = window.document.styleSheets[0];
    css.insertRule(
        `
        @keyframes ${animationInfo.animationName} {
            0% {
                transform: rotate(0deg) translate(-${animationInfo.trajectorySize}px);
            }
            100% {
                transform: rotate(240deg) translate(-${animationInfo.trajectorySize}px);
            }
        }
    `,
        index
    );
    return animationInfo;
};

Spinnig.prototype._randomlySetKeyframes = function (index, animationInfo) {
    const css = window.document.styleSheets[0];
    css.insertRule(
        `
        @keyframes ${animationInfo.animationName}_linear {
            0% {
                transform: rotate(240deg) translate(-${animationInfo.trajectorySize}px);
            }
            100% {
                transform: rotate(600deg) translate(-${animationInfo.trajectorySize}px);
            }
        }
    `,
        index
    );
};

Spinnig.prototype._renderCircles = function () {
    Array.from({ length: 25 }, () => 0).map((value, index) => {
        const first_speed = Math.random() * 0.2 + 0.3 + "s";
        const linear_speed = Math.random() * 2 + 5 + "s";
        const circleSize = Math.random() * 8 + 2 + "px";
        const circleBackground =
            this.circleColors[
                Math.floor(Math.random() * this.circleColors.length)
            ];

        const animationInfo = this._firstLoop(index);
        this._randomlySetKeyframes(index, animationInfo);
        value = document.createElement("div");
        value.classList.add("circle");
        value.style.width = circleSize;
        value.style.height = circleSize;

        value.style.animation = `${animationInfo.animationName} ${first_speed} linear, ${animationInfo.animationName}_linear ${linear_speed} linear ${first_speed} infinite`;
        value.style.backgroundColor = circleBackground;

        this.containerEl.appendChild(value);
    });
};

Spinnig.prototype._fadeOutCard = function () {
    const contentsBox = document.querySelector(".contents-box");
    contentsBox.style.animation = "fade_out 1s linear";
    contentsBox.addEventListener("animationend", () => {
        contentsBox.style.display = "none";
    });
};

window.spinning = new Spinnig(document.querySelector(".js-container"));
