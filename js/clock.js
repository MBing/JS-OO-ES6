(function (window) {

    function Clock (elementId, offset = 0, label = 'UTC') {
        let d = new Date();
        this.offset = (offset + d.getTimezoneOffset()) * 60 * 1000;
        this.elementId = elementId;
        this.label = label;

        this.update();
        var that = this;
        setInterval(function () {
            that.update();
        }, 1000 );
    }

    Clock.prototype.formatDigits = function (time) {
        if (time < 10) {
            time = `0${time}`;
        }
        return time;
    };

    Clock.prototype.update = function () {
        let date = new Date();
        date = new Date(this.offset + date.getTime());
        let time = {
            hours: date.getHours(),
            minutes: date.getMinutes(),
            seconds: date.getSeconds(),
        };
        let clockEl = document.getElementById(this.elementId);

        clockEl.innerHTML = `${this.formatDigits(time.hours)}:${this.formatDigits(time.minutes)}:${this.formatDigits(time.seconds)} ${this.label}`;
    };

    function onReady () {
        let clock1 = new Clock('clock');
        let clock2 = new Clock('clock2', -300, 'ETC');
    }

    window.onload = onReady;
})(window);