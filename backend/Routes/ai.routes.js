const express = require('express')

const router = express.Router()
const AiController = require('../Controllers/ai.controller')


router.post("/get-review",
    AiController.getReview
)

module.exports = router