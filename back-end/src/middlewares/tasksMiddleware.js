 const validateFieldTitle = (req, res, next) => {
    const { body } = req;

    if (body.title === undefined){
        return res.status(400).json({message: "The field 'title' is required"})
    }

    if (body.title === ""){
        return res.status(400).json({messae: "the field 'title' is empty"})
    }

    next() // o next tem a função de mandar a proxima função ser executada no arquivo de router
 }

 const validadeFieldStatus = (req, res, next) => {
    const { body } = req;

    if (body.status === undefined){
        return res.status(400).json({message: "The field 'status' is required"})
    }

    if (body.status === ""){
        return res.status(400).json({messae: "the field 'status' is empty"})
    }

    next() // o next tem a função de mandar a proxima função ser executada no arquivo de router
 }

 module.exports = {
    validateFieldTitle,
    validadeFieldStatus,
 }