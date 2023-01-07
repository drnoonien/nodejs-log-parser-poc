import fs from 'fs'
import path from 'path'
import { ENCOUNTER_START, EventMapper, MAPPED_EVENT, WORLD_MARKER_PLACED } from './event-mapper'
import { LogParser } from './log-parser'

const file = process.argv[2]

async function main() {

    const filePath = path.resolve(`${file}`)
    // const filePath = path.resolve(__dirname, `../logs/cn_chill_ev.txt`)

    const eventMapper = new EventMapper()
    const logParser = new LogParser<MAPPED_EVENT>({
        mapper: (line) => {
            return eventMapper.map(line)
        }
    })
    const out: MAPPED_EVENT[] = []
    let collect = false
    let worldMarkers: WORLD_MARKER_PLACED[] = []
    let map: MAPPED_EVENT

    logParser.streamSync(filePath, (eventLine, _reader) => {

        if (eventLine.event === 'MAP_CHANGE') {
            map = eventLine
        }

        if (eventLine.event === 'WORLD_MARKER_PLACED') {
            worldMarkers.push(eventLine)
        }
        if (eventLine.event === 'WORLD_MARKER_REMOVED') {
            worldMarkers = worldMarkers.filter(marker => marker.marker != eventLine.marker)
        }

        if (eventLine.event === 'ENCOUNTER_START') {
            console.log('Found encounter', eventLine)
            const fileName = getFileName(eventLine)

            if (fs.existsSync(getOutPath(fileName))) {
                console.log('Encounter already written to disk, skipping', fileName)
                return
            }


            out.push(eventLine)
            console.log('Decorating log with world markers and map data')
            for (let index = 0; index < worldMarkers.length; index++) {
                out.push(worldMarkers[index])
            }
            out.push(map)
            collect = true
            return
        }

        if (collect && eventLine.event === 'ENCOUNTER_END') {
            out.push(eventLine)

            if (out[0].event !== "ENCOUNTER_START") {
                throw Error(`Expected first item to be encounter start, it was not, something is borked, actual first event: ${JSON.stringify(out[0])}`)
            }

            const fileName = getFileName(out[0])
            console.log('Writing encounter to file', fileName)

            fs.writeFileSync(getOutPath(fileName), JSON.stringify(out, null, '  '))
            console.log('Done writing')

            out.length = 0
            collect = false
            return
        }

        if (collect /*&& eventLine['positionX']*/) {
            out.push(eventLine)
            return
        }

    })

}

main()
    .catch(err => {
        if (err.syscall == "open" && err.code == "ENOENT") {
            console.error(`ERROR: Use quotes around the given filepath, i.e. npm start "C:\\path\\file.log"`)
        } else {
            console.error(err)
        }
    })

// ---------------------------------------------------------------------------------------

function getOutPath(fileName: string) {
    const outPath = path.resolve(__dirname, `../parsed/`)

    if (!fs.existsSync(outPath)) {
        fs.mkdirSync(outPath)
    }

    const fullOutPath = path.resolve(outPath, fileName)

    return fullOutPath
}

function getFileName(eventLine: ENCOUNTER_START) {
    const name = eventLine.encounterName.replace(/\"/g, "")
    const time = eventLine.date.split(" ")[1].replace(/:/g, '_')

    return `${name} ${time}.json`
}