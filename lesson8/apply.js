

Function.prototype.Function.prototype.newBind = function () {
    const _this = this;
    const args = Array.prototype.slice.call(arguments)
    const newThis = args.shift()


    return function () { return _this.newApply(newThis, args) }
}

Function.prototype.newApply = function (context) {
    const execContext = context || window
    execContext.fn = this;

    const result = arguments[1] ? execContext.fn(...arguments[1]) : execContext.fn()

    delete execContext.fn;

    return result;

}

Function.prototype.newCall = function () {
    const args = Array.prototype.slice.call(arguments)
    const context = args.shift()
    context.fn = this;

    return context.fn(...args)

}

const o1 = {
    name: 'o1',
}

function print(age) {
    console.log(this.name + age)
}


print.newApply(o1, [1111])

const o2 = {
    name: 'o2'
}

const bindPrint = print.newBind(o2, 2222)

bindPrint()


const o3 = {
    name: 'o3'
}

print.newCall(o3, 3333)

