class ContextMaze {
    constructor(name) {
        this.name = name;
    }

    log() {
        console.log(this.name);
    }

    delayedLog() {
        setTimeout(function() {
            console.log(this.name);
        }.bind(this), 1000);

        setTimeout(() => {
            console.log(this.name);
        }, 1000);

        setTimeout(function() {
            console.log(this.name);
        }.bind(this), 1000);
    }

    nested(fn) {
        return fn.call(this);
    }
}

const a = new ContextMaze("A");
const b = new ContextMaze("B");

a.log();
b.log();
a.nested(b.log.bind(b));
b.nested(a.delayedLog.bind(a));
const lost = a.log;
lost.call(b);
