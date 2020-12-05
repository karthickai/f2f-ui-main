<template>
  <div
      id="demo"
      :class="[{'collapsed' : collapsed}, {'onmobile' : isOnMobile}]"
  >
    <b-navbar  class="is-dark" :mobile-burger=false>
      <template slot="brand">
        <b-navbar-item tag="router-link" :to="{ path: '/' }">
          <img src="@/assets/logo.png" alt="LDimensions" height="36"/>
        </b-navbar-item>
      </template>
    </b-navbar>

    <div class="demo">
      <router-view/>

      <sidebar-menu
          :menu="menu"
          :collapsed="collapsed"
          :theme="selectedTheme"
          :show-one-child="true"
          @toggle-collapse="onToggleCollapse"
          @item-click="onItemClick"
      />
      <div
          v-if="isOnMobile && !collapsed"
          class="sidebar-overlay"
          @click="collapsed = true"
      />
    </div>
  </div>
</template>

<script>
const separator = {
  template: `<hr style="border-color: rgba(0, 0, 0, 0.1); margin: 20px;">`
}

export default {
  name: 'App',
  data() {
    return {
      menu: [
        {
          header: true,
          title: 'My Account',
          hiddenOnCollapse: true
        },
        {
          title: 'Products',
          icon: 'fa fa-star',
          child: [
            {
              href: '/smart-video',
              title: 'Smart Movie Assistant',
              icon: 'fa fa-video',
              badge: {
                text: 'new',
                class: 'vsm--badge_default'
              }
            },

          ]
        },
        {
          href: '/subscription',
          title: 'Subscription',
          icon: 'fa fa-dollar-sign'
        },
        {
          href: '/invoices',
          title: 'Invoices',
          icon: 'fa fa-file-invoice'
        },
        {
          href: '/feedback',
          title: 'Feedback',
          icon: 'fa fa-comments'
        },


      ],
      collapsed: false,
      themes: [
        {
          name: 'Default theme',
          input: ''
        },
        {
          name: 'White theme',
          input: 'white-theme'
        }
      ],
      selectedTheme: '',
      isOnMobile: false
    }
  },
  mounted() {
    this.onResize()
    window.addEventListener('resize', this.onResize)
  },
  methods: {
    onToggleCollapse(collapsed) {
      console.log(collapsed)
      this.collapsed = collapsed
    },
    onItemClick() {
      console.log('onItemClick')
      // console.log(event)
      // console.log(item)
      // console.log(node)
    },
    onResize() {
      if (window.innerWidth <= 767) {
        this.isOnMobile = true
        this.collapsed = true
      } else {
        this.isOnMobile = false
        this.collapsed = false
      }
    }
  }
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro:400,600');

body,
html {
  margin: 0;
  padding: 0;
}

body {
  font-family: 'Source Sans Pro', sans-serif;
  font-size: 18px;
  background-color: #ffffff;
  color: #262626;
}

#demo {
  padding-left: 350px;
  transition: 0.3s ease;
}

#demo.collapsed {
  padding-left: 50px;
}

#demo.onmobile {
  padding-left: 50px;
}

.sidebar-overlay {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: #000;
  opacity: 0.5;
  z-index: 900;
}

.demo {
  padding: 50px;
}

//.container {
//  max-width: 900px;
//}

pre {
  font-family: Consolas, monospace;
  color: #000;
  background: #fff;
  border-radius: 2px;
  padding: 15px;
  line-height: 1.5;
  overflow: auto;
}

</style>