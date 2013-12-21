
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'o' });
};

exports.ok = function(req, res){
  res.render('ok', { title: 'oo' });
};