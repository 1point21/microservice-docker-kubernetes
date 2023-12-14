const app = require("./app")
const express = require("express")

exports.router = express.Router()

const fridgeContents = [
    {id: 0, item: "milk", quantity: 1},
    {id: 1, item: "butter", quantity: 3},
    {id: 2, item: "carrots", quantity: 9}
]
    
// healthcheck
router.get("/healthcheck", (req, res) => {
    res.status(200).send({health: "OK"})
})

// GET fridgecontents
router.get("/", (req, res, next) => {
    res.status(200).send(fridgeContents);
})

// POST fridgecontents
router.post("/", (res, req, next) => {
    const body = req
    const newId = fridgeContents.length
    const newItem = {id: newId, ...body}
    
    if (!req.item || !req.quantity){
        res.status(400).send({message: "incompatible post request"})
    }

    fridgeContents.push(body)

    res.status(200).send({newItem: body})
})

// DELETE item in fridge
router.delete("/:id", (res, req, next) => {
    const id = req.params.id
    
    if (id >= fridgeContents.length) {
        res.status(400).send({message: "Not a valid id"})
    }
    const removedItem = fridgeContents(id)
    fridgeContents.splice(id-1, 1)

    res.status(201).send({message: "deletion successful!"})
})
