<script setup>
import { computed } from "vue";
import { Post } from "../models/Post.js";
import { postsService } from "../services/PostsService.js";
import { logger } from "../utils/Logger.js";
import Pop from "../utils/Pop.js";
import { AppState } from "../AppState.js";

const account = computed(()=> AppState.account)

defineProps({post: {type: Post, required: true}})

async function likePost(postId){
  try {
  await postsService.likePost(postId)

    
  } catch (error) {
    Pop.toast("Couldn't like Post", 'error')
    logger.error(error)
  }
}


async function destroyPost(postId){
try {
  const wantsToDestroy = await Pop.confirm('Are you sure you want to Destroy?', 'There is no undoing this...', 'DELETE', "question")

  if(!wantsToDestroy) return

  logger.log('Destroying Post', postId)

  await postsService.destroyPost(postId)

} catch (error) {
  Pop.toast("Couldn't Delete Post", 'error')
}


}










</script>


<template>
  <!-- <RouterLink :to="{name: 'PostDetails' , params: {postId: post.id}}"> -->
      <div class="card text-start">
        <div class="card-body  row">
          <div class="col-10 ">
            
            <RouterLink :to="{name: 'Profile', params: {profileId: post.creator.id}}">
              <h4>{{post.creator.name}}</h4>
            <img class="img-fluid creator-img" :src="post.creator.picture" alt="">
          </RouterLink>
            <!-- <h4 class="card-title">{{post.}}</h4> -->
            <p class="card-text text-center">{{post.body}}</p>
           <button @click="likePost(post.id)" ><i class="mdi mdi-thumb-up-outline"></i></button>
           {{ post.likeIds.length }}
          </div>
          <div class="col-2">
            <img class="img-fluid" :src="post.imgUrl" alt="picture">
          </div>
          <div class="text-end">

            Created on: {{ post.createdAt.toLocaleString() }}
          </div>
        </div>
      </div>
      <div class="text-end">
      <button v-if="post.creatorId == account?.id" @click="destroyPost(post.id)" class="btn btn-outline-danger" title="Full Send!">Delete</button>
    </div>
      <!-- </RouterLink> -->
      </template>

<style lang="scss" scoped>

.creator-img{
  height: 50px;
  width: 50px;
}

</style>