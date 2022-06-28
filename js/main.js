function Stopwatch(elem) {
    let time = 0,
        interval,
        offset;

    function update() {
        if (this.isOn) {
            time += delta();
        }
        let formattedTime = timeFormatter(time);
        elem.textContent = formattedTime;
    }

    function delta() {
        let now = Date.now(),
            timePassed = now - offset;
        offset = now;
        return timePassed;
    }

    function timeFormatter(ms) {
        let time = new Date(ms),
            minutes = time.getMinutes().toString(),
            seconds = time.getSeconds().toString(),
            milliSeconds = time.getMilliseconds().toString();
        if (minutes.length < 2) {
            minutes = "0" + minutes;
        }

        if (seconds.length < 2) {
            seconds = "0" + seconds;
        }

        while (milliSeconds.length < 3) {
            milliSeconds = "0" + milliSeconds;
        }

        return minutes + " : " + seconds + " . " + milliSeconds;
    }

    this.isOn = false;

    this.start = function () {
        if (!this.isOn) {
            interval = setInterval(update.bind(this), 10);
            offset = Date.now();
            this.isOn = true;
        }
    };

    this.stop = function () {
        if (this.isOn) {
            clearInterval(interval);
            interval = null;
            this.isOn = false;
        }
    };

    this.reset = function () {
        if (!this.isOn) {
            time = 0;
            update();
        }
    };
}

// Switch Clock / Stop Watch
$(document).ready(function () {
    $("#c").click(function () {
        $("#c").addClass("active-btn");
        $("#s").removeClass("active-btn");
        $("#clock").fadeIn();
        $("#stop-watch").hide();
    });
    $("#s").click(function () {
        $("#c").removeClass("active-btn");
        $("#s").addClass("active-btn");
        $("#clock").hide();
        $("#stop-watch").fadeIn();
    });
});

// Clock
function clock() {
    var hrMinSec = document.getElementById("clock"),
        time = new Date(),
        hours = time.getHours(),
        minutes = time.getMinutes(),
        seconds = time.getSeconds();

    function main() {
        function isLessThanTen() {
            if (hours < 10) {
                hours = "0" + hours;
            }
            if (minutes < 10) {
                minutes = "0" + minutes;
            }
            if (seconds < 10) {
                seconds = "0" + seconds;
            }
        }
        isLessThanTen();
        hrMinSec.innerHTML = hours + ":" + minutes + ":" + seconds;
    }

    main();
}

clock();
window.onload = function () {
    setInterval(clock, 1000);
};

// Stop Watch
let sWatch = document.getElementById('sWatch');

let watch = new Stopwatch(sWatch);

function toggleBtn(e) {
    if (watch.isOn) {
        watch.stop();
        e.innerText = "Start";
        e.classList = 'control-btn start';
    } else {
        watch.start();
        e.textContent = "Stop";
        e.classList = 'control-btn stop';
    }
}

function resetBtn() {
    watch.reset();
}