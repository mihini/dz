import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);
const baseUrl = "https://jsonplaceholder.typicode.com/";

export default new Vuex.Store({
  state: {
    users: [],
    posts: [],
    loading: true,
    filteredUsers: [],
    post: []
  },
  mutations: {
    SET_USERS(state, payload) {
      state.users = payload;
    },
    SET_POSTS(state, payload) {
      state.posts = payload;
    },

    SET_USER_IMAGE(state, payload) {
      state.users.map(user => {
        payload.forEach(photo => {
          if (user.albumId == photo.albumId) {
            user.photo = photo.url;
          }
        });
      });
      state.loading = false;
    },
    SET_ALBUM(state, payload) {
      state.users.map(user => {
        payload.forEach(album => {
          if (user.id == album.userId) {
            user.albumId = album.id;
          }
        });
      });
    },
    SET_POST(state, payload) {
      state.post = payload;
      state.loading = false;
    },
    IS_LOADING(state, payload) {
      state.loading = payload;
    }
  },
  actions: {
    loadUsers({
      commit
    }) {
      commit("IS_LOADING", true);
      axios.get(`${baseUrl}users`).then(
        res => {
          commit("SET_USERS", res.data);
          this.dispatch("loadUsersImage");
        },
        err => {
          console.log(err);
        }
      );
    },
    loadPosts({
      commit
    }) {
      commit("IS_LOADING", true);
      axios.get(`${baseUrl}posts`).then(
        res => {
          commit("SET_POSTS", res.data);
        },
        err => {
          console.log(err);
        }
      );
    },
    loadSpecificPost({
      commit
    }, postId) {
      commit("IS_LOADING", true);
      let post = [];
      axios
        .get(`${baseUrl}posts/${postId}`)
        .then(
          res => {
            // commit('SET_POST', res.data)
            post = res.data;
          },
          err => {
            console.log(err);
          }
        )
        .then(
          axios.get(`${baseUrl}comments?postId=${postId}`).then(res => {
            post["comments"] = res.data;
            commit("SET_POST", post);
          })
        );
    },
    //because user doesnt have a image from the photos api, we need to get the album of the user and then get image from the album, and then add to user store.
    loadUsersImage({
      commit
    }) {
      commit("IS_LOADING", true);
      let albums = [];
      axios.get(`${baseUrl}albums`).then(
        res => {
          albums = res.data.filter(
            (album, index, self) =>
            index == self.findIndex(t => t.userId === album.userId)
          );
          commit("SET_ALBUM", albums);
        },
        err => {
          console.log(err);
        }
      );

      axios.get(`${baseUrl}photos`).then(
        res => {
          const photos = res.data.filter(
            (photo, index, self) =>
            index == self.findIndex(t => t.albumId === photo.albumId)
          );
          commit("SET_USER_IMAGE", photos);
        },
        err => {
          console.log(err);
        }
      );
    }

    // })

    // axios.get(`${baseUrl}albums`).then((res) => {

    //   const albums = res.data.filter((album, index, self) =>
    //     index == self.findIndex((t) => (
    //       t.userId === album.userId))
    //   );

    //   // commit('setUserImages', res.data)
    // }, (err) => {
    //   console.log(err)
    // })
  },

  getters: {
    getUsersByFilter: state => name => {
      if (!name) {
        return state.users;
      } else {
        return state.users.filter(user =>
          user.name.toLowerCase().includes(name.toLowerCase())
        );
      }
    }
  },
  modules: {}
});