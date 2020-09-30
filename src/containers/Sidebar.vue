<template>
<div class="sidebar">
  <div class="main-menu">
    <vue-perfect-scrollbar class="scroll" :settings="{ suppressScrollX: true, wheelPropagation: false }">
      <ul class="list-unstyled">
        <li v-for="item in nodeCategories" :class="{'active' : (selectedCategoryId === item.id && openedCategoryId === '') || openedCategoryId === item.id}" :key="item.id">
          <a v-if="nodeTemplates.filter(node => node.categoryType === item.categoryType).length > 0" @click.prevent="openSubMenu($event, item)" href="#">
            <img alt="icon" :src="`${(selectedCategoryId === item.id && openedCategoryId === '') || openedCategoryId === item.id ? item.selectedIcon : item.icon}`"/>
            {{ item.title }}
          </a>
          <a v-else href="#">
            <img :src="item.icon" alt="icon"/>
            {{ item.title }}
          </a>
        </li>
      </ul>
    </vue-perfect-scrollbar>
  </div>

  <div class="sub-menu">
    <vue-perfect-scrollbar class="scroll" :settings="{ suppressScrollX: true, wheelPropagation: false }">
      <div class="title"> <span>App Router</span>
        <div class="icon">
          <i class="simple-icon-options-vertical" @click="hideSubMenu"/>
        </div>
      </div>
      <div :class="{'search':true}" ref="searchContainer" >
        <b-input :placeholder="$t('menu.search')" />
        <span class="search-icon">
          <i class="simple-icon-magnifier"></i>
        </span>
      </div>
      <el-collapse v-model="activeNames" class="mt-4">
        <el-collapse-item title="Collection" name="Collection">
          <b-row>
            <b-colxx xxs="4" v-for="(item, index) in openedCategoryNodes" :key="index" class="pt-4 text-center">
              <NodeItem v-bind:node-item="item"></NodeItem>
            </b-colxx>
          </b-row>
        </el-collapse-item>
        <el-collapse-item title="Lorem Ipsum" name="Lorem Ipsum">
          <b-row>
            <b-colxx xxs="4" v-for="(item, index) in openedCategoryNodes" :key="index" class="pt-4 text-center">
              <NodeItem v-bind:node-item="item"></NodeItem>
            </b-colxx>
          </b-row>
        </el-collapse-item>
        <el-collapse-item title="Random Sets" name="Random Sets">
          <b-row>
            <b-colxx xxs="4" v-for="(item, index) in openedCategoryNodes" :key="index" class="pt-4 text-center">
              <NodeItem v-bind:node-item="item"></NodeItem>
            </b-colxx>
          </b-row>
        </el-collapse-item>
      </el-collapse>
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
} from '@/constants/config'

import {nodeCategories} from '@/data/nodeCategories'
import nodeTemplates from '@/data/nodeTemplates'
import NodeItem from '@/components/node/NodeItem'

import {SurfaceDrop} from 'jsplumbtoolkit-vue2-drop'

export default {
  mixins:[ SurfaceDrop ],

  components: { NodeItem },
  
  data() {
    return {
      nodeCategories,
      nodeTemplates,

      selectedCategoryId: '',
      openedCategoryId: '',
      activeNames: ['Collection'],
    }
  },
  mounted() {
    this.hideSubMenu();
    window.addEventListener('resize', this.handleWindowResize)
    this.handleWindowResize()
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.handleWindowResize)
  },

  methods: {
    ...mapMutations(['changeSideMenuStatus', 'addMenuClassname', 'changeSelectedMenuHasSubItems']),

    openSubMenu(e, category) {
      const nodes = this.nodeTemplates.filter(node => node.categoryType === category.categoryType);
      const hasSubMenu = nodes.length > 0;

      this.changeSelectedMenuHasSubItems(hasSubMenu);

      if (hasSubMenu)
      {
          const currentClasses = this.menuType ? this.menuType.split(' ').filter(x => x !== '') : '';

          if (currentClasses.includes('menu-mobile')) {
              this.addMenuClassname({
                  classname: 'sub-show-temporary',
                  currentClasses: this.menuType
              });
          } else {
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
          }

          this.openedCategoryId = category.id;
      } else {
          this.openedCategoryId = category.id;
          this.selectedCategoryId = category.id;
          this.toggle();
      }
    },
    hideSubMenu() {
      const category = this.nodeCategories.find(x => x.id === this.selectedCategoryId);
      const nodes = category ? this.nodeTemplates.filter(node => node.categoryType === category.categoryType) : [];
      const hasSubMenu = nodes.length > 0;

      if (hasSubMenu != this.selectedMenuHasSubItems) {
        if (!hasSubMenu) {
          this.changeSideMenuStatus({
            step: 0,
            classNames: this.menuType,
            selectedMenuHasSubItems: false
          })
        }
      }
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
    handleWindowResize() {
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
    }),
    openedCategoryNodes() {
      const category = this.nodeCategories.find(x => x.id === this.openedCategoryId);
      const nodes = category ? this.nodeTemplates.filter(node => node.categoryType === category.categoryType) : [];
      return nodes;
    }
  },
  watch: {}
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
