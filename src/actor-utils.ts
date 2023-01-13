import { stringify } from "querystring";
import internal from "stream";
import { MAPPED_EVENT } from "./event-mapper";

export class ActorUtil {
    public getPlayerActors(eventList: MAPPED_EVENT[]): Player[] {
        eventList = eventList.filter((event: any) => event.sourceGuid && event.sourceName && event.sourceGuid.match('^Player'));
        let guidList: string[] = [];
        let playerList: Player[] = [];
        eventList.forEach((event: any) => {
            if(!guidList.includes(event.sourceGuid)) {
                guidList.push(event.sourceGuid)
                playerList.push({
                    name: event.sourceName,
                    guid: event.sourceGuid,
                })
            }    
        })


        return playerList;
    }

    public getPositionTimeLine(eventList: MAPPED_EVENT[], player: Player): PointXYT[] {
        eventList = eventList.filter((event: any) => event.sourceGuid && event.sourceGuid == player.guid && event.positionX && event.positionY && event.timestamp );
        let positionList: PointXYT[] = [];
        eventList.forEach((event: any) => {
            positionList.push({
                x: event.positionX,
                y: event.positionY,
                timestamp: event.timestamp,
                realPoint: true
            })
        })
        return positionList;
    }

    public smoothenPositionTimeLine(timeline: PointXYT[], fightTime: number): PointXYT[] {
        let newTimeLine: PointXYT[] = [];
        //Align start position to time = 0
        let firstPosition = timeline[0]
        //Pad fake events to meet first timestamp if needed
        if(firstPosition.timestamp != 0) {
            let missingTimeRange = range(0,firstPosition.timestamp-1)
            newTimeLine.push(...generateStaticPosition(firstPosition, missingTimeRange)) //May exceed call stack limit, see fix with missingPointRange
        }
        //First real event
        let firstEvent: PointXYT = timeline.shift()!
        newTimeLine.push(firstEvent)

        //Can now individually pad between all the points:
        let lastEvent = firstEvent
        timeline.forEach(point => {
            if(point.timestamp > lastEvent.timestamp+1) {
                let missingRange = range(lastEvent.timestamp+1,point.timestamp-1)
                newTimeLine.push(...padBetweenPoints(lastEvent, point, missingRange))
            }
            newTimeLine.push(point)
            lastEvent = point
        })

        //add final points (in case of death or similar things, need to pad a static position until end of fight)
        if(lastEvent.timestamp < fightTime) {
            let missingTimeRange = range(lastEvent.timestamp+1,fightTime)
            let missingPointRange = generateStaticPosition(firstPosition, missingTimeRange)
            missingPointRange.forEach(point => {newTimeLine.push(point)}) //Expansion of ...missingPointRange as a push will exceed call stack limit...
        }

        return newTimeLine;
    }
}

export type Player = {
    name: string,
    guid: string
}

export type PointXYT = {
    x: number,
    y: number,
    timestamp: number,
    realPoint: boolean,
}

function range(lowerBound: number, upperBound: number): number[] {
    if(lowerBound == upperBound) {
        return [lowerBound]
    }
    if(lowerBound > upperBound) {
        return []
    }
    const intRange = Array.from(new Array((upperBound-lowerBound)+1), (x,i) => i + lowerBound)
    return intRange;
}

function makePoint(x:number,y:number,timestamp:number): PointXYT {
    return {
        x: x,
        y: y,
        timestamp: timestamp,
        realPoint: false,
    }
}

function generateStaticPosition(staticPoint: PointXYT, timeRange: number[]): PointXYT[] {
    let staticPointList: PointXYT[] = [];
    staticPointList = Array.from(timeRange, (x, i) => makePoint(staticPoint.x, staticPoint.y, x))
    return staticPointList;
}


function padBetweenPoints(startPoint: PointXYT, endPoint: PointXYT, timeRange: number[]): PointXYT[] {
    let deltaX: number = Math.abs(startPoint.x - endPoint.x)
    let deltaY: number = Math.abs(startPoint.y - endPoint.y)
    let stepX: number = deltaX / timeRange.length
    let stepY: number = deltaY / timeRange.length
    let staticPointList: PointXYT[] = [];
    let stepCounter = 1;

    timeRange.forEach(timestamp => {
        let newX = startPoint.x + stepX*stepCounter
        let newY = startPoint.y + stepY*stepCounter
        //Dark magic step
        newX = +(Math.round(+(newX + "e+2"))  + "e-2");
        newY = +(Math.round(+(newY + "e+2"))  + "e-2");
        staticPointList.push({
            x: newX,
            y: newY,
            timestamp: timestamp,
            realPoint: false,
        })
        stepCounter++
    })
    return staticPointList;
}