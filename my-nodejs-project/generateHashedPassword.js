const bcrypt = require('bcrypt');

bcrypt.hash('admin1password', 10, function(err, hash) {
    console.log(hash);
});