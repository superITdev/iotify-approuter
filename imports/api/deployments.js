import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check, Match } from 'meteor/check';

export const Deployments = new Mongo.Collection('Deployments');

if (Meteor.isServer) {
  Meteor.publish('Deployments', function() {
    return Deployments.find({
      ownerId: this.userId,
    });
  });
}

Meteor.methods({
  'deployments.create'(info) {
    check(info, {
      _id: Match.Maybe(String),
      ownerId: String,
      createdAt: Match.Maybe(Date),
      updatedAt: Match.Maybe(Date),

      name: String,
      description: Match.Maybe(String),
      graph: Match.Maybe(String),
    });

    if (!this.userId || (info.ownerId && info.ownerId !== this.userId)) {
      throw new Meteor.Error('not-authorized');
    }
    console.log("Deploying", info);
  
    const at = new Date();
    if (!info._id) { // new project
      return Deployments.insert({
        ownerId: this.userId,
        createdAt: at,
        updatedAt: at,

        name: info.name,
        description: info.description,
        graph: info.graph,
      });
    } else { // update project
      return Deployments.update(info._id, {$set: {
        updatedAt: at,

        name: info.name,
        description: info.description,
        graph: info.graph,
      }});
    }
  },  
  'deployments.remove'(_id) {
    check(_id, String);

    const deploy = Deployments.findOne(_id);
    if (deploy.ownerId !== this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    Deployments.remove(_id);
  },
});