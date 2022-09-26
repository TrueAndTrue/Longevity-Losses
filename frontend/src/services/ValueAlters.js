


const ValueAlters = {

  calendarChange: (val) => {
    console.log(val)
    return JSON.stringify(val).split('').slice(1, 11).join('')
  },

  graphChange: (date) => {
    const arr = date.split('/');
    const month = (parseInt(arr[0]) - 1).toString();
    const day = parseInt(arr[1]);
    const year = parseInt(arr[2]);
    return new Date(year, month, day);
  }
}


export default ValueAlters;