const pool = require("../db");
const controllers = require("./dateify");

const userController = {
  postUser: async (req, res) => {
    try {
      const { user_id, created_at } = req.body;
      const newUser = await pool.query(
        "INSERT INTO users (user_id, created_at) VALUES($1, $2)",
        [user_id, created_at]
      );
      res.json(newUser);
    } catch (error) {
      res.json(error.message);
    }
  },

  getUser: async (req, res) => {
    try {
      const { id } = req.params;
      const returnUser = await pool.query(
        "SELECT * FROM users WHERE user_id = $1",
        [id]
      );
      controllers.dateify(returnUser.rows[0]);
      res.json(returnUser.rows);
    } catch (error) {
      res.json(error.message);
    }
  },
};

module.exports = userController;
