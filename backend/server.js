import mongoose from "mongoose"
import express from "express"
import bodyParser from "body-parser"
import cors from "cors"

const app = express()
app.use(bodyParser.json())
app.use(cors())

const mongoUrl = "mongodb://localhost/sprint5repetition"
mongoose.connect(
  mongoUrl,
  { useNewUrlParser: true }
)
mongoose.Promise = Promise

const Beer = mongoose.model("Beer", {
  name: {
    type: String,
    required: true
  },
  style: {
    type: String,
    required: true,
    enum: ["Lager", "IPA", "Pilsner", "Wheat"]
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  }
})

// const beers = [
//   new Beer({ name: "Mariestads", style: "Lager", rating: 2 }),
//   new Beer({ name: "Ship full of IPA", style: "IPA", rating: 4 }),
//   new Beer({ name: "Bitburger", style: "Pilsner", rating: 3 }),
//   new Beer({ name: "Sol", style: "Lager", rating: 2 }),
//   new Beer({ name: "Budweiser", style: "Lager", rating: 1 }),
//   new Beer({ name: "Heinekin", style: "Pilsner", rating: 2 }),
//   new Beer({ name: "Punk IPA", style: "IPA", rating: 3 }),
//   new Beer({ name: "Berliner", style: "Wheat", rating: 4 })
// ]

// beers.forEach(beer => {
//   beer.save().then(() => {
//     console.log("Created", beer.name)
//   })
// })

app.get("/beers", (req, res) => {
  if (req.query.style) {
    Beer.find({ style: req.query.style }).then(beers => {
      res.json(beers)
    })
  } else {
    Beer.find().then(beers => {
      res.json(beers)
    })
  }
})

app.listen(8080, () => {
  console.log("Server running!")
})
