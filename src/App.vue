<template>
  <div id="app" class="container">
    <!-- <div id="nav"> -->
    <!-- <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>-->
    <!-- </div> -->

    <router-view>
      <!-- <Users /> -->
    </router-view>
  </div>
</template>

<script>
// import { mapActions } from "vuex";
// import Users from "./views/Users.vue";
export default {
  components: {
    // Users
  },
  methods: {
    // ...mapActions(["loadUsers", "loadPosts", "loadSpecificPost"])
  }
  // mounted() {
  //   this.loadUsers();
  //   this.loadPosts();
  // }
};
</script>
