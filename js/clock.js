(function (window) {

    function Clock (elementId, offset = 0, label = 'UTC') {
        const d = new Date();
        const that = this;

        this.offset = (offset + d.getTimezoneOffset()) * 60 * 1000;
        this.date = new Date(this.offset + d.getTime());
        this.date.autoClock(true)
        this.elementId = elementId;
        this.label = label;
        this.update();

        setInterval(function () {
            that.update();
        }, 1000 );
    }

    Date.prototype.updateSeconds = function () {
        this.setSeconds(this.getSeconds()+1);
    };

    Date.prototype.autoClock = function (isAuto) {
        clearInterval(this.clockInterval);

        if (isAuto) {
            const that = this;

            this.clockInterval = setInterval(function () {
                that.updateSeconds();
            }, 1000);
        }
    };

    Clock.prototype.formatDigits = function (time) {
        if (time < 10) {
            time = `0${time}`;
        }

        return time;
    };

    Clock.prototype.update = function () {
        const date = this.date;
        const time = {
            hours: date.getHours(),
            minutes: date.getMinutes(),
            seconds: date.getSeconds(),
        };
        let clockEl = document.getElementById(this.elementId);

        clockEl.innerHTML = `${this.formatDigits(time.hours)}:${this.formatDigits(time.minutes)}:${this.formatDigits(time.seconds)} ${this.label}`;
    };

    function onReady () {
        const clock1 = new Clock('clock');
        const clock2 = new Clock('clock2', -300, 'ETC');
    }

    window.onload = onReady;
})(window);