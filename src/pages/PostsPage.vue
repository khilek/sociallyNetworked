<script setup>
import { computed, onMounted } from "vue";
import { api } from "../services/AxiosService.js";
import { postsService } from "../services/PostsService.js";
import { logger } from "../utils/Logger.js";
import Pop from "../utils/Pop.js";
import { AppState } from "../AppState.js";

 const posts = computed(() => AppState.posts)

async function getPosts(){
try {
await postsService.getPosts()
} catch (error) {
  Pop.toast("Couldn't get Posts")
  logger.log (error)
}
}

onMounted(()=>{
  getPosts()
})
</script>


<template>
<section class="row my-2">
    <SearchBar/>
  </section>

<div class="container">
  <section class="row">
    <div v-for="post in posts" :key="post.id" class="col-12 p-1 mb-1">
 <PostCard :post="post"/>
<div>
</div>

    </div>

  </section>


</div>


</template>


<style lang="scss" scoped>

</style>