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

tu.friendsIds(function(err, data) {
  var ids = data.ids;
  var users = {};

  if(ids && ids.length) {
    tu.mentionsTimeline({ count: 200 }, function(err, data) {

      data = data.filter(function(mention) {
        return ~ids.indexOf(mention.user.id);
      });

      data.forEach(function(item) {
        var user = item.user;
        if(!users[user.id_str]) {
          users[user.id_str] = {
            id: user.id,
            name: user.name,
            description: user.description,
            screen_name: user.screen_name,
            url: 'http://twitter.com/' + user.screen_name,
            image: 'https://api.twitter.com/1/users/profile_image?size=reasonably_small&screen_name=' + user.screen_name,
            statuses: []
          };
        }
        delete item.user;
        users[user.id_str].statuses.push(item);
      });

      users = exports.toArray(users);

      fn(users);

      fs.writeFile(path.join(__dirname, 'data.json'), JSON.stringify({ members: users }), function(err) {
        if(err) console.log(err);
      });
    })
  }
})

}