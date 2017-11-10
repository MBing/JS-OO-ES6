(function (window) {

    function getTime () {
        let time = new Date();
        let clock = {
            hours: time.getHours(),
            minutes: time.getMinutes(),
            seconds: time.getSeconds(),
        };

        let clockEl = document.getElementById('clock');

        clockEl.innerHTML = `${formatDigits(clock.hours)}:${formatDigits(clock.minutes)}:${formatDigits(clock.seconds)}`;
    }

    function formatDigits (time) {
        if (time < 10) {
            time = `0${time}`;
        }
        return time;
    }

    function startClock () {
        getTime();
        setInterval(getTime, 1000)
    }

    window.onload = startClock;
})(window);