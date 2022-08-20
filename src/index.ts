import fs from 'fs'
import path from 'path'
import { EventLine, EventMapper, EVENTS } from './event-mapper'
import { LogParser } from './log-parser'

const file = process.argv[2]

async function main() {

    const filePath = path.resolve(`${file}`)
    // const filePath = path.resolve(__dirname, `../logs/cn_chill_ev.txt`)

    const eventMapper = new EventMapper()
    const logParser = new LogParser<EventLine>({
        mapper: (line) => {
            return eventMapper.filteredMap(line)
        }
    })
    const out: EventLine[] = []
    let collect = false
    let worldMarkers: EventLine[] = []

    logParser.streamSync(filePath, (eventLine, _reader) => {

        //TODO: Should maybe sort these as they come in so we dont
        //store events for duplicate markers, this is fine for now.
        if (eventLine.event === EVENTS.WORLD_MARKER_PLACED) {
            worldMarkers.push(eventLine)
        }
        if (eventLine.event === EVENTS.WORLD_MARKER_REMOVED) {
            worldMarkers = worldMarkers.filter(marker => marker.marker != eventLine.marker)
        }

        if (eventLine.event === EVENTS.ENCOUNTER_START) {
            console.log('Found encounter', eventLine)
            const fileName = getFileName(eventLine)

            if (fs.existsSync(getOutPath(fileName))) {
                console.log('Encounter already written to disk, skipping', fileName)
                return
            }


            out.push(eventLine)
            console.log('Decorating log with world markers')
            for (let index = 0; index < worldMarkers.length; index++) {
                out.push(worldMarkers[index])
            }
            collect = true
            return
        }

        if (collect && eventLine.event === EVENTS.ENCOUNTER_END) {
            out.push(eventLine)

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

function getFileName(eventLine: EventLine) {
    const name = eventLine.encounterName.replace(/\"/g, "")
    const time = eventLine.date.split(" ")[1].replace(/:/g, '_')

    return `${name} ${time}.json`
}