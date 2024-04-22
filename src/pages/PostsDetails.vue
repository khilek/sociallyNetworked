<script setup>
import { computed, onMounted, ref, watch } from "vue";
import { AppState } from "../AppState.js";
import { useRoute } from "vue-router";
import Pop from "../utils/Pop.js";
import { postsService } from "../services/PostsService.js";
import { logger } from "../utils/Logger.js";

const account = (()=> AppState.account)

const post = computed(()=> AppState.posts)

const activePost = computed(()=> AppState.activePost)

const route = useRoute()





const formData = ref({
  body: '',
  imgUrl: '',


})




async function getPostById(){
try {
  await postsService.getPostById(route.params.postId)
} catch (error) {
  Pop.toast ("Couldn't get Post By Id")
}
}


async function updatePosts(postId) {
  try {
    await postsService.updatePosts(route.params.postId)

    logger.log('Updating Post', formData.value)
  } catch (error) {
    logger.log("Couldn't update Post", 'error')

  }
}

watch(()=>AppState.activePost, ()=>{
  formData.value = {...AppState.activePost} 
  logger.log(formData.value)
}, {immediate: true})


onMounted(() => {
  getPostById()
})


</script>


<template>
<div class="container">
      <div class="card text-start mt-3">
        <div v-if="activePost" class="card-body row ">
          <div class="col-10">
            <RouterLink :to="{name: 'Profile', params:{profileId: activePost.creatorId} }">
              <h4>{{activePost.creator.name}}</h4>
            </RouterLink>
            <!-- <h4 class="card-title">{{activePost.title}}</h4> -->
            <p class="card-text">{{activePost.body}}</p>
          </div>
          <div class="col-2">
            <img class="img-fluid" :src="activePost.imgUrl" alt="Cover Image">
          </div>
        </div>
      </div>
    </div>

    <div class="container">
      <form @submit.prevent="updatePosts()" class="row">
      <div class="mb-3 col-12">
      <label for="post-body">Body</label>
      <textarea v-model="formData.body" name="post-body" id="post-body" rows="5" class="form-control"></textarea>
    </div>
    <div class="mb-3 col-4">
    <label for="post-imgUrl">Image Url</label>
      <input v-model="formData.imgUrl" class="form-control" type="url" id="post-imgUrl" required maxlength="500">
    </div>


<div class="mb-3 col-6 d-flex align-items-end justify-content-end">
      <button class="btn btn-success w-50">Save <i class="mdi mdi-floppy"></i></button>
    </div>
  </form>
</div>
</template>


<style lang="scss" scoped>

</style>