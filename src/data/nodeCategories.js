import "./NodeCategoryTypes";
import NodeCategoryTypes from "./NodeCategoryTypes";

const nodeCategories = [
    {
        id: "cache",
        title: "",
        categoryType: NodeCategoryTypes.deployment,
        icon: "/assets/img/menu/dashbord.png",
        selectedIcon: '/assets/img/menu/dashbord-active.png',
    },
    {
        id: NodeCategoryTypes.deployment,
        title: "Deployment",
        categoryType: NodeCategoryTypes.deployment,
        icon: "/assets/img/menu/deploy.png",
        selectedIcon: '/assets/img/menu/deploy-active.png',
    },
    {
        id: NodeCategoryTypes.protocol,
        title: "Protocol",
        categoryType: NodeCategoryTypes.protocol,
        icon: "/assets/img/menu/protocols.png",
        selectedIcon: '/assets/img/menu/protocols-active.png',
    },
    {
        id: NodeCategoryTypes.memory,
        title: "Memory",
        categoryType: NodeCategoryTypes.memory,
        icon: "/assets/img/menu/memory.png",
        selectedIcon: '/assets/img/menu/memory-active.png',
    },
    {
        id: NodeCategoryTypes.control,
        title: "Control",
        categoryType: NodeCategoryTypes.control,
        icon: "/assets/img/menu/control.png",
        selectedIcon: '/assets/img/menu/control-active.png',
    },
    {
        id: NodeCategoryTypes.illustration,
        title: "Illustration",
        categoryType: NodeCategoryTypes.illustration,
        icon: "/assets/img/menu/illustrations.png",
        selectedIcon: '/assets/img/menu/illustrations-active.png',
    },
];

function getNodeThumbIcon(node) {
    const thumbs = {
        [NodeCategoryTypes.deployment]: "/assets/img/red.png",
        [NodeCategoryTypes.protocol]: "/assets/img/blue.png",
        [NodeCategoryTypes.memory]: "/assets/img/green.png",
        [NodeCategoryTypes.control]: "/assets/img/yellow.png",
        [NodeCategoryTypes.illustration]: "/assets/img/light-blue.png",
    }
    return thumbs[node.categoryType];
}

export {nodeCategories, getNodeThumbIcon};