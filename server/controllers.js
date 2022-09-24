

const controllers = {

  dateify: (userObj) => {
    const time = 1663129103445;
    const dateTime = new Date(time).toLocaleDateString("en-US");
    userObj.created_at = dateTime;
    return userObj;
  },

  dateify2: (arr) => {
    const newArr = JSON.parse(arr);
    newArr.forEach((el) => {
      const time = el[0];
      const dateTime = new Date(time).toLocaleDateString("en-US");
      el[0] = dateTime;
    });
    return newArr
  }
}

module.exports = controllers;