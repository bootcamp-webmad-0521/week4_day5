require("dotenv/config");

require("./db");

const express = require("express");
const app = express();

require("./config")(app)
require("./config/session.config")(app)         // Configuración de sesión

app.locals.siteTitle = 'Auth app';

const index = require("./routes/index");
app.use("/", index);

require("./error-handling")(app);

module.exports = app