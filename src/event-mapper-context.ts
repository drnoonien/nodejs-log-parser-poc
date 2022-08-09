import { LineArgs } from './log-parser'
import { milliToTimestamp } from './time-utils'

/**
 * Logging context helper.
 */
class EventMapperContext {

    lineArgs: LineArgs | null = null
    timestamp: string = ""

    setLineArgs(lineArgs: LineArgs) {
        this.lineArgs = lineArgs
        this.timestamp = milliToTimestamp(lineArgs.encounterTimeMs)
    }

    getLineArgs() {
        return this.lineArgs
    }

    clearLineArgs() {
        this.lineArgs = null
    }

    getTimestamp() {
        return this.timestamp
    }

}

export const eventMapperContext = new EventMapperContext()