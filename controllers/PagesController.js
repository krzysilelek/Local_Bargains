exports.home = (req, res) => {
  res.render('home');
};

exports.db = (req, res) => {
  res.render('db', {
    query: req.dbquery.now
  });
};

