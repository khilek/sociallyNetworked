<script setup>
import { computed, onMounted } from "vue";
import { AppState } from "../AppState.js";
import { useRoute } from "vue-router";
import Pop from "../utils/Pop.js";
import { postsService } from "../services/PostsService.js";

const account = (()=> AppState.account)

const post = computed(()=> AppState.posts)

const activePost = computed(()=> AppState.activePost)

const route = useRoute()

async function getPostById(){
try {
  await postsService.getPostById(route.params.postId)
} catch (error) {
  Pop.toast ("Couldn't get Post By Id")
}

}

onMounted(() => {
  getPostById()
})
</script>


<template>

      <div class="card text-start">
        <div v-if="activePost" class="card-body row">
          <div class="col-10 ">
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
</template>


<style lang="scss" scoped>

</style>