function formatAMPM(hours, minutes) {
    var ampm = hours >= 12 ? "pm" : "am";
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    var strTime = hours + ":" + minutes + " " + ampm;
    return strTime;
  }
  
  function getDayFunc(date) {
    const day = new Date(date).getDay();
    if (day === 0) {
      return "Sun";
    } else if (day === 1) {
      return "Mon";
    } else if (day === 2) {
      return "Tue";
    } else if (day === 3) {
      return "Wed";
    } else if (day === 4) {
      return "Thu";
    } else if (day === 5) {
      return "Fri";
    } else if (day === 6) {
      return "Sat";
    }
  }

export {formatAMPM, getDayFunc }