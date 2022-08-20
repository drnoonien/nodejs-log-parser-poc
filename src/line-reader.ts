import nReadLines from 'n-readlines'

export interface SyncLineReader {
    read(filePath: string, forEach: (line: string, lineNumber: number, reader: any) => void): void
}

export class NReadLinesReader implements SyncLineReader {

    read(filePath: string, forEach: (line: string, lineNumber: number, reader: any) => void): void {
        const reader = new nReadLines(filePath, {
            // This is the default value, this lib cannot handle `\r\n`
            newLineCharacter: '\r'
        })

        let line: Buffer | false = false
        let lineNumber = 0

        while (line = reader.next()) {
            // Notice we have to remove the linebreak manually, this
            // lib can't split on two chars
            const thisLine = line.toString('utf8').replace(/\n/g, '')

            if (thisLine.length <= 0) {
                break
            }

            forEach(thisLine, lineNumber, reader)
            lineNumber++
        }
    }

}

export class MockedLineReader implements SyncLineReader {

    constructor(private lines: string[]) { }

    read(_filePath: string, forEach: (line: string, lineNumber: number, reader: any) => void): void {
        this.lines.forEach((line, index) => {
            forEach(line, index, null)
        })
    }

}