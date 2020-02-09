<template>
  <div v-if="isLoading"></div>
  <div v-else class="detail">
    <button class="btn" @click="$router.go(-1)">Back</button>
    <article class="detail__post">
      <h1 class="detail__post-title">{{ postsDetail.title }}</h1>
      <p class="detail__post-text">{{ postsDetail.body }}</p>
    </article>
    <div class="detail__comments-container">
      <h2 class="detail__sub-title">Comments</h2>
      <div
        class="detail__comment"
        v-for="comment in postsDetail.comments"
        :key="`${comment.id}-comment`"
      >
        <h3 class="detail__comment-title">{{ comment.name }}</h3>
        <span class="detail__comment-sub-title">
          By:
          <a :href="`mailto:${comment.email}`">{{ comment.email }}</a>
        </span>
        <p class="detail__comment-text">{{ comment.body }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  mounted() {
    this.loadSpecificPost(this.$route.params.id);
  },
  methods: {
    ...mapActions(["loadSpecificPost"])
  },
  computed: {
    isLoading() {
      return this.$store.state.loading;
    },
    postsDetail() {
      return this.$store.state.post;
    }
  }
};
</script>
