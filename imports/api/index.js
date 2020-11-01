import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

// for REST api
export const AppRouterCS = new Mongo.Collection('AppRouter');

if (Meteor.isServer) {
    Meteor.publish('AppRouterCS', () => {
        return AppRouterCS.find({
        });
    });
}

Meteor.methods({
    'AppRouterCS.saveConfig'(config) { // save config
    },
    'AppRouterCS.loadConfig'() { // restore config
    },
});