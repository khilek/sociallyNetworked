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


async function changePage(pageNumber){
try {
  await postsService.changePage(pageNumber)
} catch (error) {
  Pop.toast("Couldn't Change Page", 'error')
  logger.error(error)
}

}

async function changeSearchPage(pageNumber){
  try {
    await postsService.changePage(`api/posts?page=${pageNumber}&query=${AppState.searchTerm}`)
  } catch (error) {
    Pop.toast("Could not change search page", 'error')
    logger.error(error);
  }




  async function updatePosts(postId){
  try {
    await postsService.updatePosts(postId)
  } catch (error) {
    logger.log("Couldn't Update Post", 'error')

  }
}



}

onMounted(()=>{
  getPosts()
})
</script>


<template>
<!-- <section class="row m-3 py-3">
  <div class="col-8 text-center">
    <SearchBar />
  </div>
  </section> -->



  <section v-if="!AppState.searchTerm" class="row py-2 m-3 ">
    <div class="col-4">
      <button :disabled="AppState.currentPage == 1" class="btn btn-primary w-100 m-3" @click="changePage(AppState.currentPage - 1)" >Previous Page</button>
    </div>
    <div class="col-4 text-center">Page {{AppState.currentPage}} of {{ AppState.totalPages }}</div>
    <div class="col-4">
      <button :disabled="AppState.currentPage == AppState.totalPages" class="btn btn-primary w-100 m-3" @click="changePage(AppState.currentPage + 1)">Next Page</button>
    </div>
  </section>


  <section v-else class="row my-2">
    <div class="col-4">
      <button :disabled="AppState.currentPage == 1" class="btn btn-info w-100" @click="changeSearchPage(AppState.currentPage - 1)" >Previous Page</button>
    </div>
    <div class="col-4 text-center">Page {{AppState.currentPage}} of {{ AppState.totalPages }}</div>
    <div class="col-4">
      <button :disabled="AppState.currentPage == AppState.totalPages" class="btn btn-info w-100" @click="changeSearchPage(AppState.currentPage + 1)">Next Page</button>
    </div>
  </section>

  
  <div class="container">
    <section class="row mb-3 ">
      <div class="col d-flex justify-content-center">
    <button  class="btn btn-outline-dark" title="Post a Post!" data-bs-toggle="modal" data-bs-target="#postFormModal">
      <i class="mdi mdi-plus">Make a Post</i>
    </button>
  </div>
  </section>
    
    
    <section class="row mb-5">
    <div v-for="post in posts" :key="post.id" class="col-12 p-1 mb-1">
 <PostCard :post="post"/>


    </div>

  </section>


</div>

<PostFormModal/>

<FunCard/>
</template>


<style lang="scss" scoped>

</style>