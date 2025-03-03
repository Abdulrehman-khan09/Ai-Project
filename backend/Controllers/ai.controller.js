
const aiService = require('../Services/ai.services')

module.exports.getReview = async (req,res)=>{

    const {code} = req.body

    if(!code){
        return res.status(400).json({
            message:"code is required"
        })
    }

     const response = await aiService.getReview(code)
      return res.send(response)
}