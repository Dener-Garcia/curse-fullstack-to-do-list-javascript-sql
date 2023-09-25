const getAll = (req, res) => {
   return res.status(200).json({message: "controller está funcionando"})
}

module.exports = {
    getAll
}