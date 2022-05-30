<template>
  <form @submit.prevent="submit">
    <input type="text" placeholder="title" v-model="title" />
    <textarea type="text" placeholder="body" v-model="body" />
    <button type="submit">Create post</button>
  </form>
  <hr />
</template>
<script>
import {useStore} from 'vuex'
import {ref} from 'vue'
export default {
  setup() {
    const store = useStore()

    const title = ref('')
    const body = ref('')

    const submit = () => {
      store.dispatch('postNewPost', {
        title: title.value,
        body: body.value,
        id: store.getters.postsCount + 1,
      })
      title.value = ''
      body.value = ''
    }

    return {
      submit,
      title,
      body,
    }
  },
}
</script>

<style>
input, textarea {
  display: block;
  width: 100%;
  border: 1px solid #ccc;
  padding: 10px;
  margin-bottom: 10px;
}
textarea {
  min-height: 100px;
}
</style> 