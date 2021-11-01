let express = require('express')
const path = require("path");
let app = express();
require('dotenv').config();

app.use(express.static(path.join(__dirname,'./')));
app.set('views', path.join(__dirname, 'templates'));
app.set('view engine', 'ejs');

let login = require('./routes/login');
app.use('/', login)

app.listen(process.env.PORT,()=>{
    console.log("http://localhost:"+process.env.PORT);
});