import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check, Match } from 'meteor/check';

export const Projects = new Mongo.Collection('projects');

if (Meteor.isServer) {
  Meteor.publish('projects', function() {
    return Projects.find({
      ownerId: this.userId,
    });
  });
}

Meteor.methods({
  'projects.deploy'(info) {
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

    const at = new Date();
    if (!info._id) { // new project
      return Projects.insert({
        ownerId: this.userId,
        createdAt: at,
        updatedAt: at,

        name: info.name,
        description: info.description,
        graph: info.graph,
      });
    } else { // update project
      return Projects.update(info._id, {$set: {
        updatedAt: at,

        name: info.name,
        description: info.description,
        graph: info.graph,
      }});
    }
  },
  'projects.remove'(_id) {
    check(_id, String);

    const project = Projects.findOne(_id);
    if (project.ownerId !== this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    Projects.remove(_id);
  },
});