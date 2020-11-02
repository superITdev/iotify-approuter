import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

// REST apis
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

// Websocket apis
const logStream = new Meteor.Stream('logStream');
const LogStreamEvents = {
    getLog: 'get-log',
    resultLog: 'result-log',
    onResult: undefined,
}
export function GetLog(param, onResult) {
    if (!Meteor.isClient) return;

    LogStreamEvents.onResult = onResult;
    logStream.emit(LogStreamEvents.getLog, param);
}
if (Meteor.isClient) {
    logStream.on(LogStreamEvents.resultLog, (result) => {
        if (LogStreamEvents.onResult) LogStreamEvents.onResult(result);
    });
}
if (Meteor.isServer) {
    logStream.permissions.write((eventName) => {
        // var userId = this.userId; // user is logged in?
        // var subscriptionId = this.subscriptionId; // client id
        // return true to accept and false to deny
        return true;
    });
    logStream.permissions.read((eventName) => {
        // var userId = this.userId; // user is logged in?
        // var subscriptionId = this.subscriptionId; // client id
        // return true to accept and false to deny
        return true;
    });
    logStream.addFilter(function(eventName, args) {
        // var userId = this.userId; // user is logged in?
        // var subscriptionId = this.subscriptionId; // client id
        // alter and modify args array.
        return args;
    });
    logStream.on(LogStreamEvents.getLog, (param) => {
        // param : {}
        // dummy-test
        tryDummyLog(param);

        // this.onDisconnect = function() {
        //     stopDummyLog();
        // };
    });

    // dummy test for log
    class DummyLogger {
        constructor(infinite) {
            this.infinite = infinite;
            this.limits = 50;
            this.ilog = 0;
            this.intervalId = null;
        }
        start() {
            const log = {
                field0: 'Jul 24 06:00:53.834pm',
                field1: 'info',
                field2: 'ec2-3-90-18-3-90-18',
                field3: '0.196951969519695',
                field4: 'Transformed frame initialized in 40.399606ms, billable_ize_bytes: 15891, size_bytes: 24012, source_id: 341 billable_ize_bytes: 15891, size_bytes: 24012, source_id: 341 billable_ize_bytes: 15891, size_bytes: 24012, source_id: 341 billable_ize_bytes: 15891, size_bytes: 24012, source_id: 341billable_ize_bytes: 15891, size_bytes: 24012, source_id: 341',
            }
            function generateLog() {
                log.field0 = new Date().toUTCString();
                logStream.emit(LogStreamEvents.resultLog, log);
            }
            this.intervalId = setInterval(() => {
                if (this.infinite) {
                    generateLog();
                } else if (this.ilog < this.limits) {
                    generateLog();
                    this.ilog++;
                }
            }, 1000);
        }
        stop() {
            clearInterval(this.intervalId);
        }
    }
    let dummyLoggers = [];
    function tryDummyLog(param, infinite) {
        stopDummyLog();

        const logger = new DummyLogger(infinite);
        dummyLoggers.push(logger);
        
        logger.start();
    }
    function stopDummyLog() {
        dummyLoggers.forEach(logger => logger.stop());
        dummyLoggers = [];
    }
}