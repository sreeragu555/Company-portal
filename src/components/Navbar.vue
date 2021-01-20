<template>
  <div class="page-container">
<div class="">
        <md-toolbar class="md-accent" md-elevation="4">
        <div class="md-toolbar-section-start">
          <router-link to="/" class="md-title"><h3 class="md-title" style="flex: 1">NVS</h3></router-link>
        </div>
        <div class="md-toolbar-section-end">
              <md-button to="/Login" v-if="!user">Login</md-button>
              <md-button to="/Signup" v-if="!user">Sign Up</md-button>
              <md-button to="/Profile" v-if="user">Account</md-button>
              <md-button to="/Signout" v-if="user">Sign out</md-button>
              
        </div>
        </md-toolbar>
  </div>
    <!-- For Small devices 
    <div class="md-medium-hide md-large-hide md-xlarge-hide">
    <md-app md-waterfall md-mode="fixed-last">
      <md-app-toolbar class="md-primary">
        <md-button class="md-icon-button" @click="toggleMenu" v-if="!menuVisible">
          <md-icon>menu</md-icon>
        </md-button>
        <span class="md-title">My Title</span>
      </md-app-toolbar>

      <md-app-drawer :md-active.sync="menuVisible" md-persistent="full">
        <md-toolbar class="md-transparent" md-elevation="0">
          <span>Navigation</span>

          <div class="md-toolbar-section-end">
            <md-button class="md-icon-button md-dense" @click="toggleMenu">
              <md-icon>keyboard_arrow_left</md-icon>
            </md-button>
          </div>
        </md-toolbar>

        <md-list>
          <md-list-item>
            <md-icon>move_to_inbox</md-icon>
            <span class="md-list-item-text">Inbox</span>
          </md-list-item>

          <md-list-item>
            <md-icon>send</md-icon>
            <span class="md-list-item-text">Sent Mail</span>
          </md-list-item>

          <md-list-item>
            <md-icon>delete</md-icon>
            <span class="md-list-item-text">Trash</span>
          </md-list-item>

          <md-list-item>
            <md-icon>error</md-icon>
            <span class="md-list-item-text">Spam</span>
          </md-list-item>
        </md-list>
      </md-app-drawer>

    </md-app>
    </div>-->
  </div>
</template>

<script>
import firebase from 'firebase'
  export default {
    name:"Navbar",
  data(){
    return{
      menuVisible: false,
      user:null
    }
  },
  methods: {
      toggleMenu () {
        this.menuVisible = !this.menuVisible
      }
    },
    created(){
        
                firebase.auth().onAuthStateChanged(authUser=> {
                    if (authUser!= null) {
                                this.user=authUser
                     } else {
                                this.user=null,
                                console.log("No users logged in")
                            }
                    });
                    
    },
}
</script>

<style lang="scss" scoped>
  .md-title:hover{
    text-decoration: none;
  }
  .md-toolbar + .md-toolbar {
    margin-top: 16px;
  }
  .md-app {
    min-height: 350px;
    border: 1px solid rgba(#000, .12);
  }

   // Demo purposes only
  .md-drawer {
    width: 230px;
    max-width: calc(100vw - 125px);
  }
</style>