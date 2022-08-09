export function assertDefined<T>(value: T, info?: string): asserts value {
    if (value == null) {
        throw Error([
            `Expected a value to be defined, got undefined`,
            (info != null) ? `| Info: ${info}` : ''
        ].join(' '))
    }
}