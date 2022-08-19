export function ArrayBuilder() {
    return {
        __array: [] as number[],

        /**
         * Adds to the current value.
         */
        push: function (value: number) {
            this.__array.push(value)
        },

        /**
         * Returns the current value and resets it.
         */
        flush: function (): number[] {
            const out = this.__array
            this.__array = []
            return out
        }
    }
}

export function WordBuilder() {
    return {
        __word: "",

        /**
         * Returns the current value without resetting it.
         */
        peek: function (): string {
            return this.__word
        },

        /**
         * Adds to the current value.
         */
        push: function (char: string) {
            this.__word += char
        },

        /**
         * Returns the current value and resets it.
         */
        flush: function (): string {
            const out = this.__word
            this.__word = ""
            return out
        }
    }
}