const express = require('express');
const morgan = require('morgan');
const app = express();
const apps = require('./playstore.js')
app.use(morgan('common')); 

app.get('/apps', (req, res) => {
  const { genres = "", sort } = req.query;

  //Return error if correct sort setting is not provided
  if (sort) {
    if (!['rating', 'app'].includes(sort)) {
      return res
        .status(400)
        .send('Sort must be set to rating or app');
    }
  }

  //Lowercase the app titles
  let results = apps
        .filter(app => app.App.toLowerCase())
        .filter(app => app.Genres.toLowerCase().includes(genres.toLowerCase()));    

  //Sort the floating point ratings when rating is selected
  if (sort && ['rating'].includes(sort)) {
    console.log("Sort selected: " + sort);
    let newResults = results.sort((a,b) => {
      let val1 = a["Rating"];
      let val2 = b["Rating"];
      return val1 - val2;
    })
  }

  //Sort the App titles when app is selected
  if (sort && ['app'].includes(sort)) {
    console.log("Sort selected: " + sort);
    let newResults = results.sort((a, b) => {
      console.log("");
      let val1 = a["App"].toLowerCase();
      let val2 = b["App"].toLowerCase();
      console.log("val1, val2: " + val1 + " vs " + val2);
      if ( val1 > val2 ) {
        return 1;
      }
      if (val1 < val2 ) {
        return -1;
      }
      return 0;
    });
  }

  //console.log("Results: " + JSON.stringify(results, null, 1));
  res.json(results);
});

/*app.listen(8000, () => {
  console.log('Server started on PORT 8000');
});*/

module.exports = app;
