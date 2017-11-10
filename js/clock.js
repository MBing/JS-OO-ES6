(function (window) {

    function Clock (elementId) {
        this.formatDigits = function (time) {
                if (time < 10) {
                    time = `0${time}`;
                }
                return time;
            };
        this.update = function () {
                let date = new Date();
                let time = {
                    hours: date.getHours(),
                    minutes: date.getMinutes(),
                    seconds: date.getSeconds(),
                };
                let clockEl = document.getElementById(elementId);

                clockEl.innerHTML = `${this.formatDigits(time.hours)}:${this.formatDigits(time.minutes)}:${this.formatDigits(time.seconds)}`;
            };

        this.update();
        var that = this;
        setInterval(function () {
            that.update();
        }, 1000 );
    }



    function onReady () {
        let clock1 = new Clock('clock');
        let clock2 = new Clock('clock2');
    }

    window.onload = onReady;
})(window);