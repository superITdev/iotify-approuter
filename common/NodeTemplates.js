import NodeMajorTypes from './NodeMajorTypes.js';

// major categories
const majors = [
    {
        majorType: NodeMajorTypes.overallRecents,
        title: '',
        icon: 'IoT',
        color: '#1A237E', // indigo darken-4
    },
    {
        majorType: NodeMajorTypes.deployment,
        title: 'Deployment',
        icon: 'deployment',
        color: '#2962FF', // blue accent-4
        nodeBaseInfo: {
            isGroup: true,
            h: 450,
        },
    },
    {
        majorType: NodeMajorTypes.protocol,
        title: 'Protocol',
        icon: 'protocol',
        color: '#00C853', // green accent-4
        nodeBaseInfo: {
            w1: 50,
            w2: 75,
        },
    },
    {
        majorType: NodeMajorTypes.database,
        title: 'Database',
        icon: 'memory',
        color: '#FF6D00', // orange accent-4
        nodeBaseInfo: {
            w1: 50,
            w2: 90,
        },
    },
    {
        majorType: NodeMajorTypes.function,
        title: 'Function',
        icon: 'control',
        color: '#00B8D4', // cyan accent-4
        nodeBaseInfo: {
            w1: 50,
            w2: 75,
        },
    },
    {
        majorType: NodeMajorTypes.staticAsset,
        title: 'Static Asset',
        icon: 'illustration',
        color: '#AA00FF', // purple accent-4
        nodeBaseInfo: {
            w1: 50,
            w2: 100,
        },
    },
];

// node items
const nodeItems = [
    // deployment
    {
        majorType: NodeMajorTypes.deployment,
        itemTitle: "AWS",
        icon: 'deployment/AWS',
    },
    {
        majorType: NodeMajorTypes.deployment,
        itemTitle: "GCP",
        icon: 'deployment/GCP',
    },
    {
        majorType: NodeMajorTypes.deployment,
        itemTitle: "Edge",
        icon: 'deployment/edge',
    },
    // protocol
    // protocol/gateway
    {
        majorType: NodeMajorTypes.protocol,
        subTitle: 'Gateway',
        itemTitle: "HTTP",
        icon: 'protocol/gateway/http',
    },
    {
        majorType: NodeMajorTypes.protocol,
        subTitle: 'Gateway',
        itemTitle: "Websocket",
        icon: 'protocol/gateway/websocket',
    },
    {
        majorType: NodeMajorTypes.protocol,
        subTitle: 'Gateway',
        itemTitle: "MQTT",
        icon: 'protocol/gateway/MQTT',
    },
    // protocol/client
    {
        majorType: NodeMajorTypes.protocol,
        subTitle: 'Client',
        itemTitle: "HTTP",
        icon: 'protocol/client/http',
    },
    {
        majorType: NodeMajorTypes.protocol,
        subTitle: 'Client',
        itemTitle: "Websocket",
        icon: 'protocol/client/websocket',
    },
    {
        majorType: NodeMajorTypes.protocol,
        subTitle: 'Client',
        itemTitle: "MQTT",
        icon: 'protocol/client/MQTT',
    },
    {
        majorType: NodeMajorTypes.protocol,
        subTitle: 'Client',
        itemTitle: "NATS",
        icon: 'protocol/client/NATS',
    },
    {
        majorType: NodeMajorTypes.protocol,
        subTitle: 'Client',
        itemTitle: "TCP",
        icon: 'protocol/client/tcp',
    },
    {
        majorType: NodeMajorTypes.protocol,
        subTitle: 'Client',
        itemTitle: "UDP",
        icon: 'protocol/client/udp',
    },
    {
        majorType: NodeMajorTypes.protocol,
        subTitle: 'Client',
        itemTitle: "COAP",
        icon: 'protocol/client/COAP',
    },
    {
        majorType: NodeMajorTypes.protocol,
        subTitle: 'Client',
        itemTitle: "SSH",
        icon: 'protocol/client/ssh',
    },
    // database
    // database/client
    {
        majorType: NodeMajorTypes.database,
        subTitle: 'Client',
        itemTitle: "REDIS",
        icon: 'database/client/redis',
    },
    {
        majorType: NodeMajorTypes.database,
        subTitle: 'Client',
        itemTitle: "MongoDB",
        icon: 'database/client/mongodb',
    },
    {
        majorType: NodeMajorTypes.database,
        subTitle: 'Client',
        itemTitle: "Elastic search",
        icon: 'database/client/elasticSearch',
    },
    {
        majorType: NodeMajorTypes.database,
        subTitle: 'Client',
        itemTitle: "S3",
        icon: 'database/client/s3',
    },
    // database/server
    {
        majorType: NodeMajorTypes.database,
        subTitle: 'Server',
        itemTitle: "REDIS",
        icon: 'database/server/redis',
    },
    // function
    // function/custom
    {
        majorType: NodeMajorTypes.function,
        subTitle: 'Custom',
        itemTitle: "Javascript",
        icon: 'function/custom/javascript',
    },
    {
        majorType: NodeMajorTypes.function,
        subTitle: 'Custom',
        itemTitle: "Go",
        icon: 'function/custom/go',
    },
    // function/prebuilt
    {
        majorType: NodeMajorTypes.function,
        subTitle: 'Prebuilt',
        itemTitle: "Timer",
        icon: 'function/prebuilt/timer',
    },
    {
        majorType: NodeMajorTypes.function,
        subTitle: 'Prebuilt',
        itemTitle: "IETT",
        icon: 'function/prebuilt/IETT',
    },
    {
        majorType: NodeMajorTypes.function,
        subTitle: 'Prebuilt',
        itemTitle: "Zapier",
        icon: 'function/prebuilt/zapier',
    },
    {
        majorType: NodeMajorTypes.function,
        subTitle: 'Prebuilt',
        itemTitle: "Webhook",
        icon: 'function/prebuilt/webhook',
    },
    {
        majorType: NodeMajorTypes.function,
        subTitle: 'Prebuilt',
        itemTitle: "REST2Websocket",
        icon: 'function/prebuilt/REST2Websocket',
    },
    {
        majorType: NodeMajorTypes.function,
        subTitle: 'Prebuilt',
        itemTitle: "MQTT2HTTP",
        icon: 'function/prebuilt/MQTT2HTTP',
    },
    // staticAsset
    {
        majorType: NodeMajorTypes.staticAsset,
        itemTitle: "Web URL",
        icon: 'staticAsset/weburl',
    },
    {
        majorType: NodeMajorTypes.staticAsset,
        itemTitle: "Icon",
        icon: 'staticAsset/icon',
    },
    {
        majorType: NodeMajorTypes.staticAsset,
        itemTitle: "Github",
        icon: 'staticAsset/github',
    },
];

export {majors, nodeItems}