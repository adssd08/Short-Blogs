const express = require("express");
const cors = require("cors");
const env = require("dotenv");
const path = require("path");
const multer = require("multer");

// const storage = multer.diskStorage({
// 	destination: (req, file, cb) => {
// 		cb(null, "../client/src/assets/Images");
// 	},
// 	filename: (req, file, cb) => {
// 		cb(null, Date.now() + path.extname(file.originalname));
// 	},
// });
// const upload = multer({ storage: storage });
const upload = multer();
const connectDB = require("./db/connectDB");
const memoriesRouter = require("./routes/memories");

env.config();
const app = express();

app.use(upload.single("file"));
app.use(express.json());
app.use(cors());

app.use("/api/v1", memoriesRouter);

const port = process.env.PORT || 3001;

connectDB(process.env.MONGO_URI).then(() => {
	console.log("DB Connected");
	app.listen(port, () => {
		console.log(`Server is listening to port ${port}`);
	});
});
