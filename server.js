const express = require("express");
const app = express();

const PORT = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

require("./routes/apiRoutes")(app);
require("./routes/htmlRoute")(app);

app.listen(PORT, function () {
  console.log('Listening at PORT 3000');
});

