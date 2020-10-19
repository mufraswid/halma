function Timer(fn, t) {
    var timerObj = setInterval(fn, t);

    /* Stop timer */
    this.stop = function () {
        if (timerObj) {
            clearInterval(timerObj);
            timerObj = null;
        }
        return this;
    }

    /* Start timer */
    this.start = function () {
        if (!timerObj) {
            this.stop();
            timerObj = setInterval(fn, t);
        }
        return this;
    }

    /* Reset timer */
    this.reset = function (newT = t) {
        t = newT;
        return this.stop().start();
    }
}