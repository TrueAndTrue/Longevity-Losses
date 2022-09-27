const pool = require("../db");
const controllers = require("./dateify");

const calsController = {
  postCals: async (req, res) => {
    try {
      const {
        user_id,
        daily_cals,
        weight_history,
        starting_weight,
        weight_goal,
      } = req.body;
      await pool.query(
        "INSERT INTO meals (user_id, meal_array) VALUES($1, $2)",
        [user_id, "[]"]
      );
      const newUser = await pool.query(
        "INSERT INTO cals (user_id, daily_cals, starting_weight, weight_history, weight_goal) VALUES($1, $2, $3, $4, $5)",
        [user_id, daily_cals, starting_weight, weight_history, weight_goal]
      );
      res.json(newUser);
    } catch (error) {
      res.json(error.message);
    }
  },

  getCals: async (req, res) => {
    try {
      const { id } = req.params;
      const returnUser = await pool.query(
        "SELECT * FROM cals WHERE user_id = $1",
        [id]
      );
      returnUser.rows[0].weight_history = controllers.dateify2(
        returnUser.rows[0].weight_history
      );
      res.json(returnUser.rows);
    } catch (error) {
      res.json(error.message);
    }
  },

  updateCals: async (req, res) => {
    try {
      const { id } = req.params;
      let { weight_history } = req.body;
      weight_history = JSON.parse(weight_history);
      const oldUser = await pool.query(
        "SELECT * FROM cals WHERE user_id = $1",
        [id]
      );
      let weights = JSON.parse(oldUser.rows[0].weight_history);
      const weightDiff = weights[weights.length - 1][2] - weight_history[2];
      weight_history[1] = weightDiff;
      weights.push(weight_history);
      weights = JSON.stringify(weights);
      const returnUser = await pool.query(
        "UPDATE cals SET weight_history = $1 WHERE user_id = $2",
        [weights, id]
      );
      res.json(returnUser);
    } catch (error) {
      res.json(error.message);
    }
  },
};

module.exports = calsController;
