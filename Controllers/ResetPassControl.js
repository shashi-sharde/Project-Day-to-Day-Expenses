const path = require('path')


exports.fogetpassDetails =  (req, res, next) => {
    res.sendFile(path.join(__dirname, '../', 'views', 'ResetPass.html'));
}