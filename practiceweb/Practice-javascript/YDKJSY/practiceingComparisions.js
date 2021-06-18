

const dayStart = "07:30";
const dayEnd = "17:45";
let times = [{time : "7:00", duration : 15}, {time : "7:15", duration : 30}, {time : "7:30", duration : 30},
{time : "11:30", duration : 60}, {time: "17:00", duration : 45}, {time : "17:30", duration : 30}, {time: "18:00", duration : 15} ]

function scheduleMeeting(startTime, durationMinutes){
    let startHour = parseInt(startTime.substring(0, startTime.indexOf(":")));
    let startMinutes = parseInt(startTime.substring(startTime.indexOf(":") + 1, startTime.length));
    durationMinutes = parseInt(durationMinutes);
    let dayStartHour = parseInt(dayStart.substring(0, dayStart.indexOf(":")));
    let dayStartMinutes = parseInt(dayStart.substring(dayStart.indexOf(":") + 1, dayStart.length));
    let dayEndHour = parseInt(dayEnd.substring(0, dayEnd.indexOf(":")));
    let dayEndMinutes = parseInt(dayEnd.substring(dayEnd.indexOf(":") + 1, dayEnd.length));
    let endOfMeetingHour = startHour + Math.floor((startMinutes + durationMinutes) / 60);
    let endOfMeetingMinutes = (startMinutes + durationMinutes) % 60;
    //console.log(`the meeting start time is ${startHour}:${startMinutes} and the meeting end time is ${dayEndHour}:${dayEndMinutes}`);
    //console.log(`the daystart time is ${dayStartHour}:${dayStartMinutes}`);
    console.log(`${endOfMeetingHour} ${endOfMeetingMinutes}`);
    if(startHour < dayStartHour || (startHour == dayStartHour && startMinutes < dayStartMinutes)){return false}
    if(dayEndHour < endOfMeetingHour || (dayEndHour === endOfMeetingHour && endOfMeetingMinutes > dayEndMinutes)){return false}
    return true
    
}
times.forEach((elm) => {
    console.log(`start time is ${elm.time} and the duration is ${elm.duration} and it is ${scheduleMeeting(elm.time, elm.duration)}`);
})