<template>
<div class="sidebar" @mouseenter="isMenuOver=true" @mouseleave="isMenuOver=false" @touchstart="isMenuOver=true">
  <div class="main-menu">
    <vue-perfect-scrollbar class="scroll" :settings="{ suppressScrollX: true, wheelPropagation: false }">
      <ul class="list-unstyled">
        <li v-for="(item,index) in menuItems" :class="{ 'active' : (selectedParentMenu === item.id && viewingParentMenu === '') || viewingParentMenu === item.id }" :key="`parent_${item.id}`" :data-flag="item.id">
          <a v-if="item.newWindow" :href="item.to" rel="noopener noreferrer" target="_blank">
            <img :src="item.activeThumb" alt="icon"/>
            {{ $t(item.label) }}
          </a>
          <a v-else-if="item.subs && item.subs.length>0" @click.prevent="openSubMenu($event,item)" :href="`#${item.to}`">
            <img alt="icon" :src="`${(selectedParentMenu === item.id && viewingParentMenu === '') || viewingParentMenu === item.id ? item.activeThumb : item.thumb}`"/>
            {{ $t(item.label) }}</a>
          <router-link v-else @click.native="changeSelectedParentHasNoSubmenu(item.id)" :to="item.to">
            <img :src="item.thumb" alt="icon"/>
            {{ $t(item.label) }}</router-link>
        </li>
      </ul>
    </vue-perfect-scrollbar>
  </div>

  <div class="sub-menu">
    <vue-perfect-scrollbar class="scroll" :settings="{ suppressScrollX: true, wheelPropagation: false }">
      <div class="title"> <span>App Router</span>
        <div class="icon">
          <i class="simple-icon-options-vertical" @click="hiddenSubMenu"/>
        </div>
      </div>
      <div :class="{'search':true}" ref="searchContainer" >
        <b-input :placeholder="$t('menu.search')" />
        <span class="search-icon">
          <i class="simple-icon-magnifier"></i>
        </span>
      </div>
      <div class="mb-4 mt-4">
        <a v-b-toggle.deployment variant="primary" class="sub-item-title">Collection ----- +</a>
        <b-collapse id="deployment">
          <b-row>
            <b-colxx xxs="4" v-for="(item,index) in subItem" :key="`sub_${item.name}_${index}`" class="pt-4 text-center">                          
              <img :src="subItemPath" alt="icon" style="cursor: pointer;"/>
              <!-- <div class="figure"></div> -->
              <div class="mt-2">Deployment</div>
            </b-colxx>
          </b-row>
        </b-collapse>
      </div>
      <div class="mb-4 mt-4">
        <a v-b-toggle.lorem variant="primary" class="sub-item-title">Lorem Ipsum ----- +</a>
        <b-collapse id="lorem">
          <b-row>
            <b-colxx xxs="4" v-for="(item,index) in subItem" :key="`sub_${item.name}_${index}`" class="pt-4 text-center">                          
              <img :src="subItemPath" alt="icon" style="cursor: pointer;"/>
              <div class="mt-2">Lorem Ipsum</div>
            </b-colxx>
          </b-row>
        </b-collapse>
      </div>
    </vue-perfect-scrollbar>
  </div>
</div>
</template>

<script>
import {
  mapGetters,
  mapMutations
} from 'vuex'
import {
  menuHiddenBreakpoint,
  subHiddenBreakpoint
} from '../constants/config'
import menuItems from '../constants/menu'

export default {
  data() {
    return {
      selectedParentMenu: '',
      isMenuOver: false,
      menuItems,
      viewingParentMenu: '',
      subItemPath: '/assets/img/blue.png',
      subItem: [
        {
            color: 'red',
            name: 'deploayment'
        },
        {
            color: 'red',
            name: 'deploayment'
        },
        {
            color: 'red',
            name: 'deploayment'
        },
        {
            color: 'red',
            name: 'deploayment'
        },
        {
            color: 'red',
            name: 'deploayment'
        },
        {
            color: 'red',
            name: 'deploayment'
        }
      ]
    }
  },
  mounted() {
    this.selectMenu()
    window.addEventListener('resize', this.handleWindowResize)
    this.handleWindowResize()

  },
  beforeDestroy() {
    window.removeEventListener('resize', this.handleWindowResize)
  },

  methods: {
    ...mapMutations(['changeSideMenuStatus', 'addMenuClassname', 'changeSelectedMenuHasSubItems']),
    selectMenu() {
      const currentParentUrl = this.$route.path.split('/').filter(x => x !== '')[1]
      if (currentParentUrl !== undefined || currentParentUrl !== null) {
          this.selectedParentMenu = currentParentUrl.toLowerCase()
      } else {
          this.selectedParentMenu = 'dashboards'
      }
      this.isCurrentMenuHasSubItem();
    },
    isCurrentMenuHasSubItem() {
      const menuItem = this.menuItems.find(x => x.id === this.selectedParentMenu);
      const isCurrentMenuHasSubItem = menuItem && menuItem.subs && menuItem.subs.length > 0 ? true : false;
      if (isCurrentMenuHasSubItem != this.selectedMenuHasSubItems) {
          if (!isCurrentMenuHasSubItem) {
              this.changeSideMenuStatus({
                  step: 0,
                  classNames: this.menuType,
                  selectedMenuHasSubItems: false
              })
          }
      }

      return isCurrentMenuHasSubItem;
    },

    changeSelectedParentHasNoSubmenu(parentMenu) {
      this.selectedParentMenu = parentMenu
      this.viewingParentMenu = parentMenu
      this.changeSelectedMenuHasSubItems(false)
      this.changeSideMenuStatus({
          step: 0,
          classNames: this.menuType,
          selectedMenuHasSubItems: false
      })
    },

    openSubMenu(e, menuItem) {
      console.log('menuItem', menuItem);
      const selectedParent = menuItem.id;
      const hasSubMenu = menuItem.subs && menuItem.subs.length > 0;
      this.changeSelectedMenuHasSubItems(hasSubMenu);
      if (!hasSubMenu) {
          this.viewingParentMenu = selectedParent;
          this.selectedParentMenu = selectedParent;
          this.toggle();
      } else {
          const currentClasses = this.menuType ?
              this.menuType.split(' ').filter(x => x !== '') :
              '';

          if (!currentClasses.includes('menu-mobile')) {
              if (
                  currentClasses.includes('menu-sub-hidden') &&
                  (this.menuClickCount === 2 || this.menuClickCount === 0)
              ) {
                  this.changeSideMenuStatus({
                      step: 3,
                      classNames: this.menuType,
                      selectedMenuHasSubItems: hasSubMenu
                  });
              } else if (
                  currentClasses.includes('menu-hidden') &&
                  (this.menuClickCount === 1 || this.menuClickCount === 3)
              ) {
                  this.changeSideMenuStatus({
                      step: 2,
                      classNames: this.menuType,
                      selectedMenuHasSubItems: hasSubMenu
                  });
              } else if (
                  currentClasses.includes('menu-default') &&
                  !currentClasses.includes('menu-sub-hidden') &&
                  (this.menuClickCount === 1 || this.menuClickCount === 3)
              ) {
                  this.changeSideMenuStatus({
                      step: 0,
                      classNames: this.menuType,
                      selectedMenuHasSubItems: hasSubMenu
                  });
              }
          } else {

              this.addMenuClassname({
                  classname: 'sub-show-temporary',
                  currentClasses: this.menuType
              });
          }
          this.viewingParentMenu = selectedParent;
      }
      switch (menuItem.id) {
        case 'dashboards':
          this.subItemPath = '/assets/img/blue.png';
          break;
        case 'deployment':
          this.subItemPath = '/assets/img/green.png';
          break;
        case 'protocols':
          this.subItemPath = '/assets/img/yellow.png';
          break;
        case 'memory':
          this.subItemPath = '/assets/img/red.png';
          break;
        case 'control':
          this.subItemPath = '/assets/img/purple.png';
          break;
        case 'illustrations':
          this.subItemPath = '/assets/img/light-blue.png';
          break;
      }
    },

    hiddenSubMenu() {
      console.log('hiddenSubMenu');
    },

    toggle() {
      const currentClasses = this.menuType.split(' ').filter(x => x !== '')
      if (currentClasses.includes('menu-sub-hidden') && this.menuClickCount === 3) {
          this.changeSideMenuStatus({
              step: 2,
              classNames: this.menuType,
              selectedMenuHasSubItems: this.selectedMenuHasSubItems
          })
      } else if (currentClasses.includes('menu-hidden') || currentClasses.includes('menu-mobile')) {
          if (!(this.menuClickCount === 1 && !this.selectedMenuHasSubItems)) {
              this.changeSideMenuStatus({
                  step: 0,
                  classNames: this.menuType,
                  selectedMenuHasSubItems: this.selectedMenuHasSubItems
              })
          }
      }
    },
    // Resize
    handleWindowResize(event) {
      if (event && !event.isTrusted) {
          return
      }
      let nextClasses = this.getMenuClassesForResize(this.menuType)
      this.changeSideMenuStatus({
          step: 0,
          classNames: nextClasses.join(' '),
          selectedMenuHasSubItems: this.selectedMenuHasSubItems
      })
    },
    getMenuClassesForResize(classes) {
      let nextClasses = classes.split(' ').filter(x => x !== '')
      const windowWidth = window.innerWidth

      if (windowWidth < menuHiddenBreakpoint) {
          nextClasses.push('menu-mobile')
      } else if (windowWidth < subHiddenBreakpoint) {
          nextClasses = nextClasses.filter(x => x !== 'menu-mobile')
          if (
              nextClasses.includes('menu-default') &&
              !nextClasses.includes('menu-sub-hidden')
          ) {
              nextClasses.push('menu-sub-hidden')
          }
      } else {
          nextClasses = nextClasses.filter(x => x !== 'menu-mobile')
          if (
              nextClasses.includes('menu-default') &&
              nextClasses.includes('menu-sub-hidden')
          ) {
              nextClasses = nextClasses.filter(x => x !== 'menu-sub-hidden')
          }
      }
      return nextClasses
    },
  },
  computed: {
    ...mapGetters({
      menuType: 'getMenuType',
      menuClickCount: 'getMenuClickCount',
      selectedMenuHasSubItems: 'getSelectedMenuHasSubItems'
    })
  },
  watch: {
    '$route'(to, from) {
      if (to.path !== from.path) {

        const toParentUrl = to.path.split('/').filter(x => x !== '')[1];
        if (toParentUrl !== undefined || toParentUrl !== null) {
          this.selectedParentMenu = toParentUrl.toLowerCase()
        } else {
          this.selectedParentMenu = 'dashboards'
        }
        this.selectMenu()
        this.toggle();
        this.changeSideMenuStatus({
          step: 0,
          classNames: this.menuType,
          selectedMenuHasSubItems: this.selectedMenuHasSubItems
        })

        window.scrollTo(0, top)
      }
    }
  }
}
</script>

<style lang="less" rel="stylesheet/less" scoped>
  .sub-menu {
    .figure {
      width: 59px;
      height: 59px;
      background: #E6FFE7;
      border: 1px solid #01CB09;
      border-radius: 5px;
    }
  }
</style> 
