const express = require('express');
const cors = require('cors');
const routing = require('./routes');

const app = express();
const port = process.env.PORT || 5000;
const hostname = '0.0.0.0';

// Body JSON Parser + Cors
app.use(express.json());
app.use(cors());

routing(app);

app.listen(port, hostname, () => {
  console.log(`Listen and serve on http://${hostname}:${port}`);
});
