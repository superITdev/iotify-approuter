// Import Collections
// alive_legacy
// import '/imports/_legacy/server/main.js'

import { Meteor } from 'meteor/meteor';
import '/imports/api';

Meteor.startup(() => {
  // code to run on server at startup
});

const chartStream = new Meteor.Stream('chat');
chartStream.on('message', function(message) {
  console.log('user: ' + message);
});