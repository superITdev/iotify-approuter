import "./NodeCategoryTypes";
import NodeCategoryTypes from "./NodeCategoryTypes";

const nodeCategories = [
    {
        id: "cache",
        title: "",
        type: NodeCategoryTypes.deployment,
        icon: "/assets/img/menu/dashbord.png",
        selectedIcon: '/assets/img/menu/dashbord-active.png',
    },
    {
        id: NodeCategoryTypes.deployment,
        title: "Deployment",
        type: NodeCategoryTypes.deployment,
        icon: "/assets/img/menu/deploy.png",
        selectedIcon: '/assets/img/menu/deploy-active.png',
    },
    {
        id: NodeCategoryTypes.protocol,
        title: "Protocol",
        type: NodeCategoryTypes.protocol,
        icon: "/assets/img/menu/protocols.png",
        selectedIcon: '/assets/img/menu/protocols-active.png',
    },
    {
        id: NodeCategoryTypes.memory,
        title: "Memory",
        type: NodeCategoryTypes.memory,
        icon: "/assets/img/menu/memory.png",
        selectedIcon: '/assets/img/menu/memory-active.png',
    },
    {
        id: NodeCategoryTypes.control,
        title: "Control",
        type: NodeCategoryTypes.control,
        icon: "/assets/img/menu/control.png",
        selectedIcon: '/assets/img/menu/control-active.png',
    },
    {
        id: NodeCategoryTypes.illustration,
        title: "Illustration",
        type: NodeCategoryTypes.illustration,
        icon: "/assets/img/menu/illustrations.png",
        selectedIcon: '/assets/img/menu/illustrations-active.png',
    },
];

function getNodeThumbIcon(type) { // type : node.type
    const thumbs = {
        [NodeCategoryTypes.deployment]: "/assets/img/red.png",
        [NodeCategoryTypes.protocol]: "/assets/img/blue.png",
        [NodeCategoryTypes.memory]: "/assets/img/green.png",
        [NodeCategoryTypes.control]: "/assets/img/yellow.png",
        [NodeCategoryTypes.illustration]: "/assets/img/light-blue.png",
    }
    return thumbs[type];
}

export {nodeCategories, getNodeThumbIcon};