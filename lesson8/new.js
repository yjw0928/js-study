function customNew() {
    const func = Array.from(arguments).shift();
    if (typeof func !== 'function') {
        throw Error('must be Function')
    }

    const obj = Object.create(func.protoType);

    const result = obj.func(...arguments);

    return typeof result === 'object' ? result : obj
}