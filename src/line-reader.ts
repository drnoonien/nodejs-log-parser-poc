import linebyline from "linebyline"
import nLineByLine from 'n-readlines'

type EventType = "line" | "close" | "error"

export interface AsyncLineReader {
    on(event: EventType, callback: Function): void
    read(filePath: string): void
}

export interface SyncLineReader {
    read(filePath: string, forEach: (line: string, lineNumber: number, reader: any) => void): void
}

export class NReadLinesReader implements SyncLineReader {

    read(filePath: string, forEach: (line: string, lineNumber: number, reader: any) => void): void {
        const reader = new nLineByLine(filePath, {
            // This is the default value, this lib cannot handle `\r\n`
            newLineCharacter: '\r'
        })

        let line: Buffer | false = false
        let lineNumber = 0

        while (line = reader.next()) {
            const thisLine = line.toString('utf8').replace(/\n/g, '')

            if (thisLine.length <= 0) {
                break
            }

            forEach(thisLine, lineNumber, reader)
            lineNumber++
        }
    }

}

export class FileLineReader implements AsyncLineReader {

    private callbacks: { [key in EventType]: Function[] } = {
        line: [],
        close: [],
        error: []
    }

    public on(event: EventType, callback: Function) {
        this.callbacks[event].push(callback)
    }

    public read(filePath: string) {
        const lineTraverser = linebyline(filePath)

        this.callbacks.line.forEach(cb => {
            lineTraverser.on('line', (line: string, currentLineIndex: number) => {
                // Roll back to a proper zero-index
                cb(line, currentLineIndex - 1)
            })
        })
        this.callbacks.close.forEach(cb => {
            lineTraverser.on('close', cb)
        })
        this.callbacks.error.forEach(cb => {
            lineTraverser.on('error', cb)
        })
    }

}

export class MockedLineReader implements AsyncLineReader {

    private callbacks: { [key in EventType]: Function[] } = {
        line: [],
        close: [],
        error: []
    }

    constructor(private lines: string[]) {

    }

    public on(event: EventType, callback: Function) {
        this.callbacks[event].push(callback)
    }

    public read() {
        this.lines.forEach((line, index) => {
            this.callbacks.line.forEach(cb => cb(line, index))
        })

        this.callbacks.close.forEach(cb => cb())
    }

}