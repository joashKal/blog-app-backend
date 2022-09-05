const express = require('express');
const mongoose = require('mongoose')
const app = express()
const MONGO_URI = "mongodb+srv://josh:1234@cluster0.l9is7qr.mongodb.net/?retryWrites=true&w=majority"
mongoose.connect(MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true})
.then(()=>console.log("MongoDB connected"))
.catch(error => console.error("MongoDB connection failed"))

app.use(express.json())
app.use(express.urlencoded({extended: true}));

app.use("/api/users", require("./routes/authRoutes"))
app.use("/api/blogs", require("./routes/blogRoutes"))

app.listen(5000, ()=> console.log("Server is listening on port 5000...."))