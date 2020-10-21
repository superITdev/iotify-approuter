// wrapper class for client side local storage.
import CSDBStorage from '/common/CSDBStorage.js';
import {default as $store} from '/imports/store';
import NodeMajorTypes from '/common/NodeMajorTypes';

const nLimitsRecentNodeItems = 9; // maximum number of recetly used node-items to register.

class CSStorage {
    constructor() {
    }
    init() {
        this.storage = undefined;
        
        const storage = new CSDBStorage();        
        const self = this;
        storage.init(() => {
            self.storage = storage;
            self.load();
        });
    }
    isValid() {
        return this.storage != null;
    }
    isInvalid() {
        return !this.isValid();
    }
    save() {
        if (this.isInvalid()) return;

        this.storage.set($store.state.recentlyUsedNodeItems);
    }
    load() {
        if (this.isInvalid()) return;

        this.storage.get((data) => {
            if (data !== undefined) {
                $store.commit('recentlyUsedNodeItems', data);
            }
        });
    }
    registerRecentNodeItem_1(category, nodeItem) {
        let recents = $store.state.recentlyUsedNodeItems[category];

        if (!recents) recents = [];
        recents = recents.filter(item => !(item.majorType===nodeItem.majorType && item.subTitle===nodeItem.subTitle && item.itemTitle===nodeItem.itemTitle));
        recents.unshift(nodeItem);

        recents = recents.slice(0, nLimitsRecentNodeItems);
        
        $store.commit('recentlyUsedNodeItems', {majorType: category, nodeItems: recents});
    }
    registerRecentNodeItem(nodeItem, saveStore) {
        this.registerRecentNodeItem_1(NodeMajorTypes.overallRecents, nodeItem);
        this.registerRecentNodeItem_1(nodeItem.majorType, nodeItem);

        if (saveStore) this.save();
    }
}

const csStorage = new CSStorage();

export default csStorage;