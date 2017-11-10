(function (window) {

    function createClock (elementId) {
        let clock = {
            update: function () {
                let date = new Date();
                let time = {
                    hours: date.getHours(),
                    minutes: date.getMinutes(),
                    seconds: date.getSeconds(),
                };
                let clockEl = document.getElementById(elementId);

                clockEl.innerHTML = `${formatDigits(time.hours)}:${formatDigits(time.minutes)}:${formatDigits(time.seconds)}`;
            }
        };

        clock.update();
        setInterval(clock.update, 1000)

        return clock;
    }

    function formatDigits (time) {
        if (time < 10) {
            time = `0${time}`;
        }
        return time;
    }

    function onReady () {
        let clock1 = createClock('clock');
        let clock2 = createClock('clock2');
    }

    window.onload = onReady;
})(window);