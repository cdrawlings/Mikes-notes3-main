const express = require('express');
const path = require("path");

const app = express();
// Assigns the port
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/public/assets", express.static("./public/assets"));

require("./routes/notes")(app);
require("./routes/api")(app);

// Start the server on the port
app.listen(PORT, () => console.log(`Example app listening at http://localhost:${PORT}`));