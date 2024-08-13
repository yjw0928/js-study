const o1 = {
    a: "o1",
    fn: function () {
        console.log(this)
        return this.a;
    }
}
const o2 = {
    a: 'o2',
    fn: function () {
        let fn = o1.fn;
        console.log(this)
        return fn()

    }
}

console.log(o1.fn())
console.log(o2.fn())