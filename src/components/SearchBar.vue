<script setup>
import { computed, ref } from "vue";
import { AppState } from "../AppState.js";
import { postsService } from "../services/PostsService.js";
import Pop from "../utils/Pop.js";
import { logger } from "../utils/Logger.js";




const searchQuery = ref('')

const searchTerm = computed(()=> AppState.searchTerm)




async function searchPosts(){
  try {
    await postsService.searchPosts(searchQuery.value)
    searchQuery.value = ''
  } catch (error) {
    Pop.toast ("Couldn't Search Posts", 'error')
    logger.error(error)
  }
}

async function clearSearch(){
  try {
  await postsService.clearSearch()
    
  } catch (error) {
    Pop.toast("Couldn't re-search Posts", 'error')
    logger.log(error)
  }
}


</script>


<template>
 <form @submit.prevent="searchPosts()">
  <div class="input-group">
    <input v-model="searchQuery" type="text" class="form-control" placeholder="search for posts..." id="search-input">
    <button class="btn btn-info w-25">search <i class="mdi mdi-magnify"></i></button>
  </div>
 </form>
 <div class="mt-1" v-if="searchTerm">
   <div @click="clearSearch" role="button" class="btn btn-outline-info rounded-pill" title="clear search results">{{ searchTerm }} <i class="mdi mdi-close"></i> </div>
  </div>
</template>


<style lang="scss" scoped>

</style>