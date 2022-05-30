<template>
  <div class="container">
    <PostForm />
    <h1>Posts count {{ postsCount }}</h1>
    <div v-for="post in posts" :key="post.id">
      <h2>{{ post.id }}. {{ post.title }}</h2>
      <p>{{ post.body }}</p>
      <button @click="deletePost(post.id)">delete</button>
    </div>
  </div>
</template>

<script>
import {onMounted, computed} from 'vue'
import {useStore} from 'vuex'
import PostForm from '@/components/PostForm'
export default {
  components: {PostForm},

  setup() {
    const store = useStore()

    onMounted(() => store.dispatch('getPosts', 100))

    const posts = computed(() => store.getters.validPosts)
    const postsCount = computed(() => store.getters.postsCount)
    const deletePost = (id) => {
      store.dispatch('deletePost', id)
    }

    return {
      posts,
      postsCount,
      deletePost,
    }
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.container {
  max-width: 500px;
  margin: 0 auto;
}
</style>
