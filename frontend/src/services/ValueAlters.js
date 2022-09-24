


const ValueAlters = {

  calendarChange: (val) => {
    return JSON.stringify(val).split('').slice(1, 11).join('')
  }
}


export default ValueAlters;