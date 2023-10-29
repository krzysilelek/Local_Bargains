exports.home = (req, res) => {
  res.render('home');
};

exports.db = (req, res) => {
  res.send(req.dbquery);

  /*res.render('db', {
    query: JSON.stringify(req.dbquery)
  });
  */
};

