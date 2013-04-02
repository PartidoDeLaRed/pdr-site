/**
 * Module dependencies.
 */

var fs = require('fs')
  , path = require('path')
  , tuiter = require('tuiter')

/**
 * Twitter Client instance `tu`
 */

var tu = exports.tu = tuiter({
    "consumer_key": "JeC0SJinMgFTS0ZTrY3WdQ",
    "consumer_secret": "gieHdGoRizAE7Hnd8HrbyU18zRdcOcOnzLEdPw4UlU",
    "access_token_key": "582286332-uIeTstfKRjw2eqZ1zKhmv9IrdylVhs0QwfR4w6yE",
    "access_token_secret": "TpO24u3YqAGKxwiCdUAwueybFAysJEtHxvDaPOGHYg"
  });

/**
 * Randomize array element order in-place.
 * Using Fisher-Yates shuffle algorithm.
 */

exports.shuffle = function shuffle(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}

/**
 * Turns object into array
 */

exports.toArray = function toArray (obj) {
  var array = []
    , keys = Object.keys(obj)

  for(var i = 0, l = keys.length; i < l; i++ ) {
    array.push( obj[ keys[i] ] )
  }

  return array;
}

/**
 * Retrieves last users mentioning @partidodelared
 * from Twitters public API into an array of users
 * with statuses
 */

exports.members = function members (fn) {

var users = [];

tu.friendsList(function(err, data) {

    users = data.users;
    console.log(users.length);

    tu.friendsList({cursor: data.next_cursor}, function(err, d){

      users = users.concat(d.users);

      fn(users);
      fs.writeFile(path.join(__dirname, 'data.json'), JSON.stringify({ members: users }), function(err) {
        if(err) console.log(err);
      });


    });

})

}