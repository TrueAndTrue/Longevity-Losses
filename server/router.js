const express = require("express");
const router = express.Router();
const pool = require("./db");
const dateify = require("./controllers/dateify");
const userController = require("./controllers/user");
const calsController = require("./controllers/cals");
const mealsController = require("./controllers/meals");

router.post("/user", userController.postUser);

router.get("/user/:id", userController.getUser);

router.post("/user/cals", calsController.postCals);

router.get("/user/cals/:id", calsController.getCals);

router.put("/user/cals/add/:id", calsController.updateCals);

router.put("/user/cals/meals/:id", mealsController.postMeal);

router.get("/user/cals/meals/:id", mealsController.getMeals);

router.delete("/user/cals/meals/:id", mealsController.deleteMeals);

module.exports = router;
