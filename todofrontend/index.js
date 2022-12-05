const port = process.env.PORT || 8080;
const tasks = require("./taskroute");
const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const mongodb=""
const database = async () => {
    try {
        // const connectionParams = {
        //     useNewUrlParser: true,
        //     useCreateIndex: true,
        //     useUnifiedTopology: true,
        // };
        await mongoose.connect(
            mongodb
        );
        console.log("Connected to database.");
    } catch (error) {
        console.log("Could not connect to database.", error);
    }
};

const app = express();


app.use(express.json());
app.use(cors());
database();
app.use("/api/tasks", tasks);

app.listen(port, () => console.log(`Listening on port ${port}...`));
