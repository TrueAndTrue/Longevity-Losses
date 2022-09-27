const pool = require("../db");
const controllers = require("./dateify");

const mealsController = {
  postMeal: async (req, res) => {
    try {
      const { id } = req.params;
      let flag = false;
      const { meal, date } = req.body;
      const oldMeals = await pool.query(
        "SELECT * FROM meals WHERE user_id = $1",
        [id]
      );

      oldMeals.rows[0].meal_array = JSON.parse(oldMeals.rows[0].meal_array);

      if (oldMeals.rows[0].meal_array.length > 0) {
        oldMeals.rows[0].meal_array.forEach((el) => {
          if (el[0] === date) {
            el[1].push(meal);
            flag = true;
          }
        });
      }

      if (flag) {
        oldMeals.rows[0].meal_array = JSON.stringify(
          oldMeals.rows[0].meal_array
        );
        const returnArr = await pool.query(
          "UPDATE meals SET meal_array = $1 WHERE user_id = $2",
          [oldMeals.rows[0].meal_array, id]
        );
        res.json(returnArr);
        return;
      } else {
        const arr = [date, [meal]];
        oldMeals.rows[0].meal_array.push(arr);
      }

      oldMeals.rows[0].meal_array = JSON.stringify(oldMeals.rows[0].meal_array);
      const returnArr = await pool.query(
        "UPDATE meals SET meal_array = $1 WHERE user_id = $2",
        [oldMeals.rows[0].meal_array, id]
      );

      res.json(returnArr);
    } catch (error) {
      res.json(error.message);
    }
  },

  getMeals: async (req, res) => {
    try {
      const { id } = req.params;

      const returnMeals = await pool.query(
        "SELECT * FROM meals WHERE user_id = $1",
        [id]
      );

      res.json(returnMeals.rows[0].meal_array);
    } catch (error) {
      res.json(error.message);
    }
  },

  deleteMeals: async (req, res) => {
    try {
      const { id } = req.params;
      const { meal, date } = req.body;
      console.log(meal, date)
      const oldMeals = await pool.query(
        "SELECT * FROM meals WHERE user_id = $1",
        [id]
      );

      oldMeals.rows[0].meal_array = JSON.parse(oldMeals.rows[0].meal_array);

      if (oldMeals.rows[0].meal_array.length > 0) {
        oldMeals.rows[0].meal_array.forEach((el) => {
          if (el[0] === date && el[1].includes(meal)) {
            const tempArr = [];
            el[1].forEach((subMeal) => {
              if (!(subMeal === meal)) {
                tempArr.push(subMeal);
              } 
            });
            el[1] = tempArr;
          }
        });
      }

      oldMeals.rows[0].meal_array = JSON.stringify(oldMeals.rows[0].meal_array);
      const returnArr = await pool.query(
        "UPDATE meals SET meal_array = $1 WHERE user_id = $2",
        [oldMeals.rows[0].meal_array, id]
      );
      res.json(returnArr);
    } catch (error) {
      res.json(error.message);
    }
  },
};

module.exports = mealsController;
