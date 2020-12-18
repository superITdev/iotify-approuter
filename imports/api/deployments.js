import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import Schemas from './schemas.js';

export const Deployments = new Mongo.Collection('Deployments');
Deployments.attachSchema(Schemas.Deployments);

if (Meteor.isServer) {
  Meteor.publish('deployments', function() {
    return Deployments.find({
      ownerId: this.userId,
    });
  });
}

Meteor.methods({
  'deployments.deploy'(info) {
    if (!this.userId || (info.ownerId && info.ownerId !== this.userId)) {
      throw new Meteor.Error('not-authorized');
    }
    
    const at = new Date();
    if (!info._id) { // new deployment
      return Deployments.insert({
        ownerId: this.userId,
        createdAt: at,
        updatedAt: at,

        name: info.name,
        description: info.description,
        graph: info.graph,
      });
    } else { // update deployment
      return Deployments.update(info._id, {$set: {
        updatedAt: at,

        name: info.name,
        description: info.description,
        graph: info.graph,
      }});
    }
  },
  'deployments.remove'(_id) {
    const deployment = Deployments.findOne(_id);
    if (deployment.ownerId !== this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    Deployments.remove(_id);
  },
});