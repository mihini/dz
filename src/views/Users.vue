<template>
  <div v-if="isLoading">Loading....</div>
  <div v-else class="users">
    <h1 class="users__title">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit
    </h1>
    <input
      class="users__search"
      type="text"
      placeholder="Search username"
      v-model="search"
    />
    <div class="users__all-users">
      <div class="users__card" v-for="user in filteredUsers" :key="user.id">
        <div class="users__img-container">
          <img class="users__img" :src="user.photo" alt="user" />
        </div>

        <h2 class="users__text">{{ user.name }}</h2>
        <span>{{ totalPosts(user.id) }} posts</span>
        <ul class="users__list">
          <li
            class="users__list-item"
            v-for="post in userSpecificPosts(user.id)"
            :key="`posts-${post.id}`"
          >
            <router-link class="users__post-link" :to="`/post/${post.id}`">{{
              post.title
            }}</router-link>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Users",
  components: {
    // HelloWorld
  },
  data() {
    return {
      search: ""
    };
  },
  mounted() {
    this.loadUsers();
    this.loadPosts();
  },
  methods: {
    totalPosts(id) {
      const posts = this.$store.state.posts;
      return posts.filter(post => post.userId == id).length;
    },
    userSpecificPosts(id) {
      const posts = this.$store.state.posts;
      return posts.filter(post => post.userId == id).slice(0, 3);
    },
    ...mapActions(["loadUsers", "loadPosts", "loadSpecificPost"])
  },
  computed: {
    // users() {
    //   return this.$store.state.users;
    // },
    isLoading() {
      return this.$store.state.loading;
    },
    ...mapGetters(["getUsersByFilter"]),

    filteredUsers() {
      return this.getUsersByFilter(this.search);
    }
  }
};
</script>
