<template>
  <div class="sidebar-page">
    <section class="sidebar-layout">
      <b-sidebar
          position="static"
          :mobile="mobile"
          :expand-on-hover="expandOnHover"
          type="is-light"
          :reduce="reduce"
          fullheight
          open
      >
        <div class="p-1">
          <b-menu class="is-custom-mobile">
            <b-menu-list label="My Account">
              <b-menu-item
                icon="information-outline"
                label="Products"
              ></b-menu-item>
            </b-menu-list>
            <b-menu-list>
              <b-menu-item label="Billing" icon="link"></b-menu-item>
            </b-menu-list>
            <b-menu-list>
              <b-menu-item label="Invoices" icon="link"></b-menu-item>
            </b-menu-list>
            <b-menu-list>
              <b-menu-item label="Security" icon="link"></b-menu-item>
            </b-menu-list>
            <b-menu-list>
              <b-menu-item label="Feedback" icon="link"></b-menu-item>
            </b-menu-list>
            <b-menu-list label="Actions">
              <b-menu-item icon="logout" label="Logout"></b-menu-item>
            </b-menu-list>
          </b-menu>
        </div>
      </b-sidebar>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      expandOnHover: true,
      mobile: "reduce",
      reduce: false,
    };
  },
};
</script>

<style lang="scss">
.p-1 {
  padding: 1em;
}
.sidebar-page {
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100%;
  // min-height: 100vh;
  .sidebar-layout {
    display: flex;
    flex-direction: row;
    min-height: 100%;
    // min-height: 100vh;
  }
}
@media screen and (max-width: 1023px) {
  .b-sidebar {
    .sidebar-content {
      &.is-mini-mobile {
        &:not(.is-mini-expand),
        &.is-mini-expand:not(:hover) {
          .menu-list {
            li {
              a {
                span:nth-child(2) {
                  display: none;
                }
              }
              ul {
                padding-left: 0;
                li {
                  a {
                    display: inline-block;
                  }
                }
              }
            }
          }
          .menu-label:not(:last-child) {
            margin-bottom: 0;
          }
        }
      }
    }
  }
}
@media screen and (min-width: 1024px) {
  .b-sidebar {
    .sidebar-content {
      &.is-mini {
        &:not(.is-mini-expand),
        &.is-mini-expand:not(:hover) {
          .menu-list {
            li {
              a {
                span:nth-child(2) {
                  display: none;
                }
              }
              ul {
                padding-left: 0;
                li {
                  a {
                    display: inline-block;
                  }
                }
              }
            }
          }
          .menu-label:not(:last-child) {
            margin-bottom: 0;
          }
        }
      }
    }
  }
}
</style>
