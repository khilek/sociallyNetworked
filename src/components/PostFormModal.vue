<script setup>
import { Modal } from "bootstrap";
import { postsService } from "../services/PostsService.js";
import { logger } from "../utils/Logger.js";
import Pop from "../utils/Pop.js";
import { ref } from "vue";


const editablePostData = ref({
  body: '',
  imgUrl: ''
})


async function createPost() {
  try {
    logger.log('Creating Post', editablePostData)

    await postsService.createPost(editablePostData.value)


    editablePostData.value = {
      body: '',
      imgUrl: ''
     
    }


    Modal.getOrCreateInstance('#postFormModal').hide()
  }
  catch (error) {
    Pop.error(error);
  }
}






</script>


<template>

<div class="modal fade" id="postFormModal" tabindex="-1" aria-labelledby="postFormModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="postFormModalLabel">Create a new Post!</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">

          <form @submit.prevent="createPost()">

            <div class="form-floating mb-3">
              <textarea v-model="editablePostData.body" class="form-control"
                placeholder="Leave a description here" id="postBody" maxlength="500"></textarea>
              <label for="postBody">Post Body</label>
            </div>
            <div class="form-floating mb-3">
              <textarea v-model="editablePostData.imgUrl" class="form-control"
                placeholder="Image" id="postImgUrl" maxlength="500"></textarea>
              <label for="postImgUrl">Image</label>
            </div>



            <div class="text-end">
              <button class="btn btn-success" type="submit">Submit</button>
            </div>
          </form>


        </div>
      </div>
    </div>
  </div>









</template>


<style lang="scss" scoped>

</style>