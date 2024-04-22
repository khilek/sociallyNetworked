<script setup>
import { computed, onMounted, ref, watch } from "vue";
import { AppState } from "../AppState.js";
import { logger } from "../utils/Logger.js";
import { accountService } from "../services/AccountService.js";
import Pop from "../utils/Pop.js";



const account = computed(()=> AppState.account)

const accountData = ref({
  name: '',
  email: '',
  picture: '',
  coverImg: '',
  bio: '',
  github: '',
  linkedin: '',
  class: ''

})


// onMounted(()=>{
//   accountData.value = {...AppState.account} 
//   logger.log(accountData.value)
// })

watch(()=>AppState.account, ()=>{
  accountData.value = {...AppState.account} 
  logger.log(accountData.value)
}, {immediate: true})

async function saveAccount(){
try {
  await accountService.saveAccount(accountData.value)
  logger.log('Updated Data', AppState.account)
} catch (error) {
  Pop.toast("Couldn't Save Account", 'error')
}

}

</script>


<template>


<form @submit.prevent="saveAccount()" class="row">
    <div class="mb-3 col-4">
      <label for="account-name">Name</label>
      <input v-model="accountData.name" class="form-control" type="text" id="account-name"  minlength="3" required maxlength="25"/>
    </div>
    <div class="mb-3 col-4">
      <label for="account-email">Email</label>
      <input v-model="accountData.email" class="form-control" type="text" id="account-email"  minlength="3" required maxlength="25"/>
    </div>
    <div class="mb-3 col-4">
      <label for="account-picture">Picture</label>
      <input v-model="accountData.picture" class="form-control" type="url" id="account-picture" required maxlength="500">
    </div>
    <div class="mb-3 col-4">
      <label for="account-cover-image">Cover Image</label>
      <input v-model="accountData.coverImg" class="form-control" type="url" id="account-cover-image" required maxlength="500">
    </div>
    <div class="mb-3 col-4">
      <label for="account-github">Github</label>
      <input v-model="accountData.github" class="form-control" type="url" id="account-github" required maxlength="500">
    </div>
    <div class="mb-3 col-4">
      <label for="account-linkedin">LinkedIn</label>
      <input v-model="accountData.linkedin" class="form-control" type="url" id="account-linkedin"  maxlength="500">
    </div>

    <div class="mb-3 col-12">
      <label for="account-bio">Bio</label>
      <textarea v-model="accountData.bio" name="account-bio" id="account-bio" rows="5" class="form-control"></textarea>
    </div>

    <div class="mb-3 col-6 d-flex align-items-end justify-content-end">
      <button class="btn btn-success w-50">Save <i class="mdi mdi-floppy"></i></button>
    </div>

  </form>
</template>


<style lang="scss" scoped>

</style>