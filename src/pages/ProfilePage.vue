<script setup>
import { computed, onMounted } from "vue";
import { profilesService } from "../services/ProfilesService.js";
import Pop from "../utils/Pop.js";
import { AppState } from "../AppState.js";
import { useRoute } from "vue-router";
import { postsService } from "../services/PostsService.js";

const route = useRoute()

const profile = computed(()=> AppState.activeProfile)

const posts = computed(()=> AppState.posts)


async function getProfileById(){
try {
  await profilesService.getProfileById(route.params.profileId)
} catch (error) {
  Pop.toast("Couldn't get Profile By Id", 'error')
}
}

async function getProfilePosts(){
try {
  await postsService.getProfilePosts(route.params.profileId)
} catch (error) {
  Pop.toast("Couldn't get Profile Posts", 'error')
}
}


onMounted(()=> {
  getProfileById()
  getProfilePosts()
 
})

</script>


<template>


<div class="container">
  <section v-if="profile" class="row">
    <img class="cover-img" :src="profile.coverImg" alt="">
    <div class="col text-center">
      <img class="profile-img" :src="profile.picture" alt="">
    </div>
  </section>
  <section v-if="profile" class="row">
    <div class="col text-center">
      <h1>{{ profile.name }}</h1>
      <p>{{ profile.bio }}</p>
      <p>{{ profile.class }}</p>
    </div>
  </section>
<section v-if="profile" class="row">
  <div v-for="post in posts" :key="post.id">
<PostCard :post="post"/>
  </div>
</section>
</div>

</template>


<style lang="scss" scoped>
.cover-img{
  width: 100%;
  height: 35vh;
  object-fit: cover;
  position: center;
}
.profile-img{
  width: 100px;
  height: 100px;
  object-fit: cover;
  position: center;
}
</style>