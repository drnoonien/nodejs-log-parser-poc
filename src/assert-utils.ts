export function assertDefined<T>(value: T, info?: string): asserts value {
    if (value == null) {
        throw Error([
            `Expected a value to be defined, got undefined`,
            (info != null) ? `| Info: ${info}` : ''
        ].join(' '))
    }
}

export function expectNumber(value: string): number {
    if (value == "") {
        throw Error(`Cannot convert an empty string to a number`)
    }

    const maybeInt = parseInt(value)

    if (isNaN(maybeInt)) {
        throw Error(`${value} is not a valid number`)
    }

    return maybeInt

}