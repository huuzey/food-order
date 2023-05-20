const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require("dotenv").config();
const cloudinary = require("cloudinary").v2;
const foodroute = require("./routes/foodRoute");
const formidable = require("formidable");
const foodModel = require("./models/foodModel");

const app = express();

const corsoptions = {
  origin: true,
  credentials: true,
};
app.use(express.json());
app.use(cors());

app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post("/image-upload", (req, res) => {
  const form = formidable({ multiples: true });
  form.parse(req, async (err, field, files) => {
    try {
      const response = await cloudinary.uploader.upload(
        files.image.filepath,

        {
          cloud_name: "dfanahqm3",
          api_key: "292927319546494",
          api_secret: "lAVuKBqco0HwEHnnjcbl_RbZQYw",
          secure: true,
          folder: "traveler/foodengineer",
        }
      );
      console.log(response.secure_url);
      res.status(200).json(response.secure_url);
    } catch (error) {
      console.log(error);
    }
  });
});

app.use("/api/vv", foodroute);

PORT = process.env.PORT;
mongoose
  .connect(process.env.MONGO_URL, console.log("connected"), {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server connected ${PORT}`);
    });
  })
  .catch((err) => console.log(err));
