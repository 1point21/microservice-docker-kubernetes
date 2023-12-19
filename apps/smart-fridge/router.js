const app = require("./app")
const express = require("express")

const router = express.Router()

// start items
const fridgeContents = [
    {id: 0, item: "milk", quantity: 1},
    {id: 1, item: "butter", quantity: 3},
    {id: 2, item: "carrots", quantity: 9}
]
    
// GET healthcheck
router.get("/healthcheck", (req, res) => {
    res.status(200).send({health: "OK"})
})

// GET fridgecontents
router.get("/", (req, res, next) => {
    res.status(200).send({contents: fridgeContents});
})

// POST fridgecontents
router.post("/", (req, res, next) => {
    const sent = req.body
    const newId = fridgeContents.length
    const newItem = {id: newId, ...sent}

    if (!sent.item || !sent.quantity){
        res.status(400).send({message: "incompatible post request"})
    }

    fridgeContents.push(newItem)
    res.status(201).send({addedItem: newItem})
})

// DELETE item in fridge
router.delete("/:id", (req, res, next) => {
    const id = req.params.id
    
    if (id >= fridgeContents.length) {
        res.status(400).send({message: "Not a valid id"})
    }
    const removedItem = fridgeContents(id)
    fridgeContents.splice(id-1, 1)

    res.status(201).send({message: "deletion successful!"})
})

module.exports = router