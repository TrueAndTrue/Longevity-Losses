const express = require('express');
const router = express.Router();
const pool = require('./db');
const controllers = require('./controllers');


router.post("/user", async (req, res) => {
  try {
    
    const { user_id, created_at } = req.body;
    console.log(user_id, created_at)
    const newUser = await pool.query("INSERT INTO users (user_id, created_at) VALUES($1, $2)", [user_id, created_at]);
    res.json(newUser)
  } catch (error) {
    console.error(error.message)
  }
});

//only for testing, no use case yet

router.get("/user", async (req, res) => {
  try {
    const userList = await pool.query("SELECT * FROM users");
    res.json(userList.rows);
  } catch (error) {
    console.error(error.message)
  }
})

router.get("/user/:id", async (req, res) => {
  try {
    const { id }= req.params;
    const returnUser = await pool.query("SELECT * FROM users WHERE user_id = $1", [id])
    controllers.dateify(returnUser.rows[0]);
    res.json(returnUser.rows);
  } catch (error) {
    console.error(error.message)
  }
});

router.post("/user/cals", async (req, res) => {
  try {
    const { user_id, daily_cals, weight_history, starting_weight, weight_goal } = req.body;
    console.log(weight_history)
    const meals = await pool.query("INSERT INTO meals (user_id, meal_array) VALUES($1, $2)", [user_id, '[]']);
    const newUser = await pool.query("INSERT INTO cals (user_id, daily_cals, starting_weight, weight_history, weight_goal) VALUES($1, $2, $3, $4, $5)", [user_id, daily_cals, starting_weight, weight_history, weight_goal]);
    res.json(newUser);
  } catch (error) {
    console.error(error.message)
  }
});

router.get("/user/cals/:id", async (req, res) => {
  try {
    const { id }= req.params;
    const returnUser = await pool.query("SELECT * FROM cals WHERE user_id = $1", [id])
    returnUser.rows[0].weight_history = controllers.dateify2(returnUser.rows[0].weight_history)
    res.json(returnUser.rows);
  } catch (error) {
    console.error(error.message)
    res.json(error.message)
  }
});

router.put("/user/cals/add/:id", async (req, res) => {
  try {
    const { id } = req.params;
    let { weight_history } = req.body;
    weight_history = JSON.parse(weight_history);
    const oldUser = await pool.query("SELECT * FROM cals WHERE user_id = $1", [id]);
    let weights = JSON.parse(oldUser.rows[0].weight_history);
    const weightDiff = weights[weights.length - 1][2] - weight_history[2]
    weight_history[1] = weightDiff;
    weights.push(weight_history);
    weights = JSON.stringify(weights);
    const returnUser = await pool.query("UPDATE cals SET weight_history = $1 WHERE user_id = $2", [weights, id]);
    res.json(returnUser);
  } catch (error) {
    console.log(error.message);
    res.json(error.message);
  }
});

router.put("/user/cals/meals/:id", async (req, res) => {
  try {
    const { id } = req.params;
    let flag = false;
    const { meal, date } = req.body;
    const oldMeals = await pool.query("SELECT * FROM meals WHERE user_id = $1", [id]);

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
      oldMeals.rows[0].meal_array = JSON.stringify(oldMeals.rows[0].meal_array);
      const returnArr = await pool.query("UPDATE meals SET meal_array = $1 WHERE user_id = $2", [oldMeals.rows[0].meal_array, id]);
      res.json(returnArr);
      return;
    }

    else {
      const arr = [date, [meal]];
      oldMeals.rows[0].meal_array.push(arr);
      console.log(oldMeals.rows[0].meal_array)
    }

    oldMeals.rows[0].meal_array = JSON.stringify(oldMeals.rows[0].meal_array);
    const returnArr = await pool.query("UPDATE meals SET meal_array = $1 WHERE user_id = $2", [oldMeals.rows[0].meal_array, id]);
    
    res.json(returnArr)

  } catch (error) {
    console.log(error.message);
    res.json(error.message);
  }
});

router.get("/user/cals/meals/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const returnMeals = await pool.query("SELECT * FROM meals WHERE user_id = $1", [id])

    res.json(returnMeals.rows[0].meal_array)

  } catch (error) {
    console.log(error.message);
    res.json(error.message)
  }
});

router.delete("/user/cals/meals/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { meal, date } = req.body;
    const oldMeals = await pool.query("SELECT * FROM meals WHERE user_id = $1", [id]);

    oldMeals.rows[0].meal_array = JSON.parse(oldMeals.rows[0].meal_array);

    if (oldMeals.rows[0].meal_array.length > 0) {
      oldMeals.rows[0].meal_array.forEach((el) => {
        if (el[0] === date && el[1].includes(meal)) {
          const tempArr = [];
          el[1].forEach((subMeal) => {
            if (subMeal === meal) {
              console.log('matching meal', meal);
            }
            else {
              tempArr.push(subMeal);
            }
          });
          el[1] = tempArr;
        }
      });
    }

    oldMeals.rows[0].meal_array = JSON.stringify(oldMeals.rows[0].meal_array);
    const returnArr = await pool.query("UPDATE meals SET meal_array = $1 WHERE user_id = $2", [oldMeals.rows[0].meal_array, id]);
    res.json(returnArr);

  } catch (error) {
    console.log(error.message);
    res.json(error.message)
  }

});
module.exports = router;