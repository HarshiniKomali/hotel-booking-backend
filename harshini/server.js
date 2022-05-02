const express = require("express");
const cors = require("cors");
const app = express();
const dbConfig = require("./config/db.config");
var corsOptions = {
  origin: "http://localhost:8081"
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
const db = require("./models");


db.mongoose
  .connect(`mongodb://${dbConfig.DB_HOST}:${dbConfig.DB_PORT}/${dbConfig.DB_DATABSE}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Successfully connect to MongoDB.");
    initial();
  })
  .catch(err => {
    console.error("Connection error", err);
    process.exit();
  });
  function initial() {
  }
  
//routes
const user_route = require("./routes/user.routes");
app.use(user_route);

const PORT = process.env.PORT || 8080;
app.listen(PORT,() => {
	console.log(`Server is running on port ${PORT}`);
});
