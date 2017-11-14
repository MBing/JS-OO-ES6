(function (window) {
    let com = window.com || {};
    com.mbing = com.mbing || {};

    com.mbing.Clock = function (elementId, offset = 0, label = 'UTC') {
        const d = new Date();
        this.offset = (offset + d.getTimezoneOffset()) * 60 * 1000;
        this.date = new Date(this.offset + d.getTime());
        this.date.autoClock(true);
        this.elementId = elementId;
        this.label = label;

        let that = this;

        Date.addToInterval(function () {
            that.update();
        })
    };

    com.mbing.Clock.prototype.tick = function (shouldTick) {
        this.isTicking = shouldTick;
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
            if (this.__aDates[i] instanceof Date) {
                this.__aDates[i].updateSeconds();
            } else if (this.__aDates[i] instanceof Function) {
                this.__aDates[i]();
            } else if (this.__aDates[i] && this.__aDates[i]['update']) {
                this.__aDates[i].update();
            }
        }
    };

    Date.prototype.updateSeconds = function () {
        this.setSeconds(this.getSeconds()+1);
    };

    Date.prototype.autoClock = function (isAuto) {
        if (isAuto) {
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
        if (this.isTicking) {
            const date = this.date;
            const time = {
                hours: date.getHours(),
                minutes: date.getMinutes(),
                seconds: date.getSeconds(),
            };
            let clockEl = document.getElementById(this.elementId);

            clockEl.innerHTML = this.formatOutput(time.hours, time.minutes, time.seconds, this.label);
        }
    };

    com.mbing.Clock.prototype.formatOutput = function (hours, minutes, seconds, label) {
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
    com.mbing.AlarmClock = function (id, offset, label) {
        com.mbing.Clock.apply(this, arguments);

        this.dom = document.getElementById(id);
        this.dom.contentEditable = true;
        this.dom.addEventListener('focus', (e) => {
            e.srcElement.innerHTML = e.srcElement.innerHTML.slice(0, e.srcElement.innerHTML.lastIndexOf(':'));
            this.tick(false);
        });

        this.dom.addEventListener('blur', (e) => {
            let alarm = e.srcElement.innerHTML.split(':');
            this.alarmHour = parseInt(alarm[0]);
            this.alarmMin = parseInt(alarm[1]);

            if ((this.alarmHour > 0 && this.alarmHour < 24) &&
                (this.alarmMin > 0 && this.alarmMin < 60)) {
                const event = new Event('restart_tick');
                e.srcElement.dispatchEvent(event);
            }
        });

        this.dom.addEventListener('restart_tick', () => {
            console.log('event was triggered');
            this.tick(true);
        });
    };

    com.mbing.AlarmClock.prototype = Object.create(com.mbing.Clock.prototype);
    com.mbing.AlarmClock.prototype.constructor = com.mbing.AlarmClock;

    com.mbing.AlarmClock.prototype.formatOutput = function (hours, minutes, seconds, label) {
        if (hours === this.alarmHour && minutes === this.alarmMin) {
            // HTML5 Audio element:
            // let snd = new Audio('audio/file.mp3');
            // snd.play();

            return 'ALARM WAKE UP';
        }

        return com.mbing.Clock.prototype.formatOutput.apply(this, arguments);
    };

    const LiveDate = function (a, b, c) {
        console.log(this, a, b, c);
    };

    const onReady = function () {
        const clock1 = new com.mbing.AlarmClock('clock');
        const clock2 = new com.mbing.TextClock('clock2', -300, 'ETC');
        const clock3 = new com.mbing.Clock('clock3', -300, 'ETC');

        LiveDate.call(clock1, 1,2,3); // list up items
        LiveDate.apply(clock2, [1,2,3]); // array of items
    };

    window.onload = onReady;
})(window);