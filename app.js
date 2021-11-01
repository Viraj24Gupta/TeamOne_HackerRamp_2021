let express = require('express')
const path = require("path");
let app = express();
require('dotenv').config();

app.use(express.static(path.join(__dirname,'./')));
app.set('views', path.join(__dirname, 'templates'));
app.set('view engine', 'ejs');

let new_routes = require('./routes/router');
app.use('/', new_routes)

app.listen(process.env.PORT,()=>{
    console.log("http://localhost:"+process.env.PORT);
});