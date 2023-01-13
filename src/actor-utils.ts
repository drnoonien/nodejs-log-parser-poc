import { stringify } from "querystring";
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
                timestamp: event.timestamp
            })
        })
        return positionList;
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
}