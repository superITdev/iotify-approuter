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
        nodeInfo: {
            thumbIcon: "/assets/img/red.png",
            isGroup: true,
            titleIcon: "/assets/img/menu/deploy.png",
            titleBgColor: "#00BAFF",
            h: 450,
        }
    },
    {
        id: NodeCategoryTypes.protocol,
        title: "Protocol",
        categoryType: NodeCategoryTypes.protocol,
        icon: "/assets/img/menu/protocols.png",
        selectedIcon: '/assets/img/menu/protocols-active.png',
        nodeInfo: {
            thumbIcon: "/assets/img/blue.png",
            w1: 50,
            w2: 75,
            color1: "blue",
        }
    },
    {
        id: NodeCategoryTypes.memory,
        title: "Memory",
        categoryType: NodeCategoryTypes.memory,
        icon: "/assets/img/menu/memory.png",
        selectedIcon: '/assets/img/menu/memory-active.png',
        nodeInfo: {
            thumbIcon: "/assets/img/green.png",
            w1: 50,
            w2: 90,
            color1: "green",
        }
    },
    {
        id: NodeCategoryTypes.control,
        title: "Control",
        categoryType: NodeCategoryTypes.control,
        icon: "/assets/img/menu/control.png",
        selectedIcon: '/assets/img/menu/control-active.png',
        nodeInfo: {
            thumbIcon: "/assets/img/yellow.png",
            w1: 50,
            w2: 75,
            color1: "yellow",
        }
    },
    {
        id: NodeCategoryTypes.illustration,
        title: "Illustration",
        categoryType: NodeCategoryTypes.illustration,
        icon: "/assets/img/menu/illustrations.png",
        selectedIcon: '/assets/img/menu/illustrations-active.png',
        nodeInfo: {
            thumbIcon: "/assets/img/light-blue.png",
            w1: 50,
            w2: 100,
            color1: "light-blue",
        }
    },
];

function getNodeInfo(node) {
    const nodeType = node.categoryType || node.type;
    const category = nodeCategories.find(item => item.id===nodeType);
    const info = {
        ...category.nodeInfo, // base
        ...node, // self
        type: node.categoryType,
    }
    return info;
}

export {nodeCategories, getNodeInfo};