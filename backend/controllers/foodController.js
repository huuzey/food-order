const Food = require("../models/foodModel");

const createfood = async (req, res) => {
  const { img, main } = req.body;
  try {
    const food = new Food({
      photo: img,
      title: main.title,
      desc: main.desc,
      category: main.category.toUpperCase(),
      price: main.price,
    });
    await food.save();
    res.status(200).json("food added");
  } catch (error) {
    res.status(500).send(error);
  }
};
const getfood = async (req, res) => {
  try {
    const food = await Food.find();
    console.log(food);
    res.status(200).send(food);
  } catch (error) {
    res.status(500).send(error);
  }
};
const getfoodid = async (req, res) => {
  const id = req.params.id;
  try {
    const food = await Food.findById(id);
    res.status(200).send(food);
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = { createfood, getfood, getfoodid };
