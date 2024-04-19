<script setup>
import { Post } from "../models/Post.js";



defineProps({post: {type: Post, required: true}})


</script>


<template>
  <RouterLink :to="{name: 'PostDetails' , params: {postId: post.id}}">
      <div class="card text-start">
        <div class="card-body selectable row">
          <div class="col-10 ">
            
            <h4>{{post.creator.name}}</h4>
            <!-- <h4 class="card-title">{{post.}}</h4> -->
            <p class="card-text">{{post.body}}</p>
          </div>
          <div class="col-2">
            <img class="img-fluid" :src="post.imgUrl" alt="TEST">
          </div>
        </div>
      </div>
      </RouterLink>
      </template>

<style lang="scss" scoped>

</style>