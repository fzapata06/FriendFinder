const path = require('path');

module.exports = app => {
  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/home.html'));
  });

  app.get('/survey', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/survey.html'));
  });

  app.use(function(req, res) {
    res.redirect('/');
  });
}