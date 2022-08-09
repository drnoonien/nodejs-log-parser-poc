export function milliToTimestamp(millis: number): string {
    return new Date(millis).toISOString().substring(11, 23)
}

export function HH_MM_SS_SSStoMilli(ts: string): number {

    const [hours, minutes, secMs] = ts.split(":")
    const [seconds, millis] = secMs.split(".")

    const totalSeconds = (parseInt(hours) * 60 * 60) + (parseInt(minutes) * 60) + (parseInt(seconds))
    return (totalSeconds * 1000) + parseInt(millis)

}