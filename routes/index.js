
/*
 * GET home page.
 */

exports.index = function(req, res) {
  res.render('index', { title: 'Partido de la Red' });
};

/*
 * GET video embed iframe.
 */

exports.video = function(req, res) {
  res.render('video', { vid: req.param('vid') });
};