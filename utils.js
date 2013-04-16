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
    "consumer_key": process.env.TW_CONSUMER_KEY,
    "consumer_secret": process.env.TW_CONSUMER_SECRET,
    "access_token_key": process.env.TW_ACCESS_KEY,
    "access_token_secret": process.env.TW_ACCESS_SECRET
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

  tu.friendsList({ count: 200 }, function(err, res) {
    var users = res.users
      , ids
      , members = {}
      , nonMentioningMembers
      ;

    if(! ( users || users.length) ) {
      return fn([]);
    }

    ids = users.map(function(user) { return user.id });

    tu.mentionsTimeline({ count: 200 }, function(err, mentions) {

      mentions = mentions.filter(function(mention) {
        return ~ids.indexOf(mention.user.id);
      });

      mentions.forEach(function(mention) {
        var user = mention.user
          , id = user.id_str
          ;

        if(!members[id]) {
          members[id] = {
            id: user.id,
            name: user.name,
            description: user.description,
            screen_name: user.screen_name,
            url: 'http://twitter.com/' + user.screen_name,
            image: 'https://api.twitter.com/1/users/profile_image?size=reasonably_small&screen_name=' + user.screen_name,
            statuses: []
          };
        }
        delete mention.user;
        members[id].statuses.push(mention);
      });

      nonMentioningMembers = users.filter(function(user) {
        return !members[user.id_str];
      }).map(function(user) {
        return {
            id: user.id,
            name: user.name,
            description: user.description,
            screen_name: user.screen_name,
            url: 'http://twitter.com/' + user.screen_name,
            image: 'https://api.twitter.com/1/users/profile_image?size=reasonably_small&screen_name=' + user.screen_name,
            statuses: []
          }
      });
      members = exports.toArray(members);

      members = members.concat(nonMentioningMembers);
      
      fn(members);

      fs.writeFile(path.join(__dirname, 'data.json'), JSON.stringify({ members: members }), function(err) {
        if(err) console.log(err);
      });
    })
  })

}