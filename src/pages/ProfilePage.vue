<script setup>
import { computed, onMounted } from "vue";
import { profilesService } from "../services/ProfilesService.js";
import Pop from "../utils/Pop.js";
import { AppState } from "../AppState.js";
import { useRoute } from "vue-router";
import { postsService } from "../services/PostsService.js";
import { logger } from "../utils/Logger.js";

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


async function changePageWithProfileId(pageNumber, profileId){
try {

  await postsService.changePageWithProfileId(pageNumber, route.params.profileId)
} catch (error) {
  Pop.toast("Couldn't Change Pages by Profile Id", 'error')
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
      <p>{{ profile.class }} / Graduated: {{ profile.graduated }}</p>
      <p>LinkedIn: {{ profile.linkedin }} / Github: {{ profile.github }}</p>
      <p>Resume: {{ profile.resume }}</p>
    </div>
  </section>


  <section v-if="!AppState.searchTerm" class="row py-2 m-3 ">
    <div class="col-4">
      <button :disabled="AppState.currentPage == 1" class="btn btn-primary w-100 m-3" @click="changePageWithProfileId(AppState.currentPage - 1)" >Previous Page</button>
    </div>
    <div class="col-4 text-center">Page {{AppState.currentPage}} of {{ AppState.totalPages }}</div>
    <div class="col-4">
      <button :disabled="AppState.currentPage == AppState.totalPages" class="btn btn-primary w-100 m-3" @click="changePageWithProfileId(AppState.currentPage + 1)">Next Page</button>
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