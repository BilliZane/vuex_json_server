export default {
  actions: {
    async getPosts(ctx, limit = 2) {
      const res = await fetch(
        `http://localhost:3000/posts?_limit=${limit}`
      )
      const data = await res.json()
      ctx.commit('updatePosts', data)
    },
    async postNewPost(ctx, newPost) {
      try {
        await fetch(`http://localhost:3000/posts/`, {
          method: 'POST',
          headers: {
            'Content-type': 'application/json',
          },
          body: JSON.stringify(newPost),
        })
        ctx.commit('createPost', newPost)
      } catch (err) {
        console.log(err)
      }
    },
    async deletePost(ctx, postId) {
      try {
        await fetch(`http://localhost:3000/posts/${postId}`, {
          method: 'DELETE',
        })
        ctx.commit('deletePost', postId)
      } catch (err) {
        console.log(err)
      }
    },
  },
  state: {
    posts: [],
  },
  mutations: {
    updatePosts(state, posts) {
      state.posts = posts
    },
    createPost(state, post) {
      state.posts.unshift(post)
    },
    deletePost(state, postId) {
      const target = state.posts.indexOf(
        state.posts.find((post) => post.id === postId)
      )
      state.posts.splice(target, 1)
    },
  },
  getters: {
    validPosts(state) {
      return state.posts.filter((post) => post.title && post.body)
    },
    allPosts(state) {
      return state.posts
    },
    postsCount(state, getters) {
      return getters.validPosts.length
    },
  },
}
