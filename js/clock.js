(function (window) {
    let com = window.com || {};
    com.mbing = com.mbing || {};

    com.mbing.Clock = function (elementId, offset = 0, label = 'UTC') {
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
    };

    Date.__interval = 0;
    Date.__aDates = [];

    Date.addToInterval = function (date) {
        this.__aDates.push(date);

        if (!Date.__interval) {
            Date.__interval = setInterval(function () {
                Date.updateDates()
            }, 1000);
        }
    };

    Date.updateDates = function () {
        for (let i = 0; i < this.__aDates.length; i++) {
            this.__aDates[i].updateSeconds();
        }
    };

    Date.prototype.updateSeconds = function () {
        this.setSeconds(this.getSeconds()+1);
    };

    Date.prototype.autoClock = function (isAuto) {
        // clearInterval(this.clockInterval);

        if (isAuto) {
            const that = this;

            Date.addToInterval(this);
        }
    };

    com.mbing.Clock.prototype.formatDigits = function (time) {
        if (time < 10) {
            time = `0${time}`;
        }

        return time;
    };

    com.mbing.Clock.prototype.update = function () {
        const date = this.date;
        const time = {
            hours: date.getHours(),
            minutes: date.getMinutes(),
            seconds: date.getSeconds(),
        };
        let clockEl = document.getElementById(this.elementId);

        clockEl.innerHTML = this.formatOutput(time.hours, time.minutes, time.seconds, this.label);
    };

    com.mbing.Clock.prototype.formatOutput = function (hours, minutes, seconds, label) {
        console.log('hours', hours);
        return `${this.formatDigits(hours)}:${this.formatDigits(minutes)}:${this.formatDigits(seconds)} ${label}`;
    };

    // TextClock
    com.mbing.TextClock = function (id, offset, label) {
        com.mbing.Clock.apply(this, arguments);
    };

    com.mbing.TextClock.prototype = Object.create(com.mbing.Clock.prototype);
    com.mbing.TextClock.prototype.constructor = com.mbing.TextClock;

    com.mbing.TextClock.prototype.formatOutput = function (hours, minutes, seconds, label) {
        return `${this.formatDigits(hours)} Hour ${this.formatDigits(minutes)} minutes ${this.formatDigits(seconds)} seconds ${label}`;
    };

    // // < IE8 polyfill
    // // usage:
    // // com.mbing.TextClock.prototype = createObject(com.mbing.Clock.prototype, com.mbing.TextClock);
    // function createObject(proto, cons) {
    //     function c () {};
    //     c.prototype = proto;
    //     c.prototype.constructor = cons;
    //
    //     return new c();
    // }

    // AlarmClock
    com.mbing.AlarmClock = function (id, offset, label, alarmHour, alarmMin) {
        com.mbing.TextClock.apply(this, arguments);
        this.alarmMin = alarmMin;
        this.alarmHour = alarmHour;
    };

    com.mbing.AlarmClock.prototype = Object.create(com.mbing.TextClock.prototype);
    com.mbing.AlarmClock.prototype.constructor = com.mbing.AlarmClock;

    com.mbing.AlarmClock.prototype.formatOutput = function (hours, minutes, seconds, label) {
        if (hours === this.alarmHour && minutes === this.alarmMin) {
            // HTML5 Audio element:
            // let snd = new Audio('audio/file.mp3');
            // snd.play();

            return 'ALARM WAKE UP';
        }

        return `${this.formatDigits(hours)}:${this.formatDigits(minutes)}:${this.formatDigits(seconds)} ${label}`;
    };

    const LiveDate = function (a, b, c) {
        console.log(this, a, b, c);
    };

    const onReady = function () {
        const clock1 = new com.mbing.Clock('clock');
        const clock2 = new com.mbing.TextClock('clock2', -300, 'ETC');
        const clock3 = new com.mbing.AlarmClock('clock3', -300, 'ETC', 17,8);

        LiveDate.call(clock1, 1,2,3); // list up items
        LiveDate.apply(clock2, [1,2,3]); // array of items
    };

    window.onload = onReady;
})(window);