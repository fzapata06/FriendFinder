const express = require('express');
const bodyParser = require('body-parser');

var PORT = process.env.PORT;
const app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));
app.use(express.static('app/public'));

require("./app/routing/apiRoutes")(app);
require("./app/routing/htmlRoutes")(app);


app.listen(process.env.PORT || 4000, () => {
  console.log('Listening on port 4000!')
});
