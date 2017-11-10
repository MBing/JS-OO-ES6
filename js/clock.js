(function (window) {

    function createClock (elementId) {
        let clock = {
            formatDigits: function (time) {
                if (time < 10) {
                    time = `0${time}`;
                }
                return time;
            },
            update: function () {
                let date = new Date();
                let time = {
                    hours: date.getHours(),
                    minutes: date.getMinutes(),
                    seconds: date.getSeconds(),
                };
                let clockEl = document.getElementById(elementId);

                clockEl.innerHTML = `${this.formatDigits(time.hours)}:${this.formatDigits(time.minutes)}:${this.formatDigits(time.seconds)}`;
            }
        };

        clock.update();
        setInterval(clock.update.bind(clock), 1000)

        return clock;
    }



    function onReady () {
        let clock1 = createClock('clock');
        let clock2 = createClock('clock2');
    }

    window.onload = onReady;
})(window);