import "./NodeTypes";
import NodeTypes from "./NodeTypes";

const nodeCategories = [
    {
        id: "cache",
        title: "",
        type: NodeTypes.deployment,
        icon: "/assets/img/menu/dashbord.png",
        selectedIcon: '/assets/img/menu/dashbord-active.png',
    },
    {
        id: NodeTypes.deployment,
        title: "Deployment",
        type: NodeTypes.deployment,
        icon: "/assets/img/menu/deploy.png",
        selectedIcon: '/assets/img/menu/deploy-active.png',
    },
    {
        id: NodeTypes.protocol,
        title: "Protocol",
        type: NodeTypes.protocol,
        icon: "/assets/img/menu/protocols.png",
        selectedIcon: '/assets/img/menu/protocols-active.png',
    },
    {
        id: NodeTypes.memory,
        title: "Memory",
        type: NodeTypes.memory,
        icon: "/assets/img/menu/memory.png",
        selectedIcon: '/assets/img/menu/memory-active.png',
    },
    {
        id: NodeTypes.control,
        title: "Control",
        type: NodeTypes.control,
        icon: "/assets/img/menu/control.png",
        selectedIcon: '/assets/img/menu/control-active.png',
    },
    {
        id: NodeTypes.illustration,
        title: "Illustration",
        type: NodeTypes.illustration,
        icon: "/assets/img/menu/illustrations.png",
        selectedIcon: '/assets/img/menu/illustrations-active.png',
    },
];

function getNodeThumbIcon(type) { // type : node.type
    const thumbs = {
        [NodeTypes.deployment]: "/assets/img/red.png",
        [NodeTypes.protocol]: "/assets/img/blue.png",
        [NodeTypes.memory]: "/assets/img/green.png",
        [NodeTypes.control]: "/assets/img/yellow.png",
        [NodeTypes.illustration]: "/assets/img/light-blue.png",
    }
    return thumbs[type];
}

export {nodeCategories, getNodeThumbIcon};