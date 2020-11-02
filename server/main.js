// Import Collections
// alive_legacy
// import '/imports/_legacy/server/main.js'
import '/imports/api';

import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  // code to run on server at startup
});

const chartStream = new Meteor.Stream('chat');
chartStream.on('message', function(message) {
  console.log('user: ' + message);
});