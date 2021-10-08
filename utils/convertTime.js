const { zonedTimeToUtc } = require('date-fns-tz');

const toUTC = (date, time, ampm, timezone) => {

  const timeArr = time.split(':');
  let hour = Number(timeArr[0]);
  const minutes = timeArr[1];

  if(ampm === 'AM'){
    if(hour === 12){
      hour = '00';
    }
  } else {
    if(hour === 12){
      hour = 12
    } else {
      hour += 12
    }
  }

  hour = hour < 10 ? '0' + hour : hour;

  const newDateTime = `${date} ${hour}:${minutes}:00`

  const utcObj = zonedTimeToUtc(newDateTime, timezone);

  return timeFormatter(utcObj);

}

const toLocal = (remindrArr, timeZone) => {

  options = {
    year: 'numeric', month: '2-digit', day: '2-digit',
    hour: 'numeric', minute: 'numeric',
    timezone: timeZone,
    hour12: false
  }

  if(remindrArr[0] === undefined) {
    const timeObj = remindrArr.send_date;
    const utcTime = dateConstructor(timeObj)
    const localTime = new Intl.DateTimeFormat('ko-KR', options).format(utcTime);
    const localTimeFormatted = localTimeFormatter(localTime);
    remindrArr.send_date = localTimeFormatted;

  } else {
    for (let i = 0; i < remindrArr.length; i++) {
      const timeObj = remindrArr[i].send_date;
      const utcTime = dateConstructor(timeObj)
      const localTime = new Intl.DateTimeFormat('ko-KR', options).format(utcTime);
      const localTimeFormatted = localTimeFormatter(localTime);
      remindrArr[i].send_date = localTimeFormatted;
    }
  }

  return remindrArr
}

const dateConstructor = (timeObj) => {

  const year = Number(timeObj.substring(0,4));
  const month = Number(timeObj.substring(5,7)) - 1
  const day = Number(timeObj.substring(8,10));
  const hour = Number(timeObj.substring(11,13));
  const minute = Number(timeObj.substring(14,16));

  return new Date(Date.UTC(year, month, day, hour, minute));

}

const localTimeFormatter = (timeObj) => {

  const year = timeObj.substring(0,4);
  const month = timeObj.substring(6,8)
  const day = timeObj.substring(10,12);
  const hour = timeObj.substring(14,16);
  const minute = timeObj.substring(17,19);

  return `${year}-${month}-${day}T${hour}:${minute}`
}

const timeFormatter = (timeObj) => {

  const utcRaw = JSON.stringify(timeObj)

  const removeQuote1 = utcRaw.replace('"', '')

  const removeQuote2 =  removeQuote1.replace('"', '')

  return removeQuote2.substring(0,16)

}

module.exports = {toUTC, toLocal, timeFormatter};