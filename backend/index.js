const connectToMongo = require('./db');
const express = require('express');
var cors = require('cors')
const router = express.router;
connectToMongo();
const app = express();
const port = 5000;

app.use(cors({
  origin: '*'  // Replace with your frontend URL or IP
}));

app.use(express.json());


app.use('/api/auth',require('./routes/auth'))
app.use('/api/notes',require('./routes/notes'))

app.listen(port, '0.0.0.0', () => {
  console.log(`Server is running on http://0.0.0.0:${port}`);
});