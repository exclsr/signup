
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'x' });
};

exports.ok = function(req, res){
  res.render('ok', { title: 'o' });
};