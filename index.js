const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.static('dist'));

// Set Port, hosting services will look for process.env.PORT
app.set('port', (process.env.PORT || 4000));

// start the server
app.listen(app.get('port'), () => {
  console.log(`Server is running on port ${app.get('port')}`);
});