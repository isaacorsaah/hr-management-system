exports.home = function(req, res) {
    res.render('index', { title: 'Homepage' });
};
  
exports.dashboard = function(req, res) {
    if (!req.user) {
      res.redirect('/login');
    } else {
      res.render('dashboard', { title: 'Dashboard', user: req.user });
    }
};  