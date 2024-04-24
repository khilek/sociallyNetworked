import { AppState } from "../AppState.js"
import { Post } from "../models/Post.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"

class PostsService {

  async getPosts() {
    const response = await api.get('api/posts')
    logger.log('Getting Posts', response.data)
    const posts = response.data.posts.map(post => new Post(post))
    AppState.posts = posts

  }

  async getPostById(postId) {
    AppState.activePost = null
    const response = await api.get(`api/posts/${postId}`)
    logger.log('Getting Posts By Id', response.data)
    const foundPost = new Post(response.data)
    AppState.activePost = foundPost

  }


  async searchPosts(searchQuery) {
    const response = await api.get(`api/posts?query=${searchQuery}`)
    logger.log('Searching Posts', response.data)
    const posts = response.data.posts.map(postData => new Post(postData))
    AppState.searchTerm = searchQuery
    AppState.posts = posts

  }

  async clearSearch() {
    AppState.searchTerm = ''
    await this.searchPosts()
  }





  async changePageWithProfileId(pageNumber, profileId) {
    const response = await api.get(`api/posts?creatorId=${profileId}&page=${pageNumber}`)
    logger.log('Changing Pages', response.data)
    const posts = response.data.posts.map(postData => new Post(postData))

    AppState.posts = posts
    AppState.currentPage = response.data.page
    AppState.totalPages = response.data.total_pages


  }




  async changePage(pageNumber) {
    const response = await api.get(`api/posts?page=${pageNumber}`)
    logger.log('Switching Pages', response.data)
    const posts = response.data.posts.map(postData => new Post(postData))
    AppState.posts = posts
    AppState.currentPage = response.data.page
    AppState.totalPages = response.data.total_pages


  }


  async createPost(postData) {
    const response = await api.post('api/posts', postData)
    logger.log('Creating Post', response.data)
    // const posts = response.data.posts.map(post => new Post(post))
    const newPost = new Post(response.data)
    AppState.posts.push(newPost)

  }

  /**
    * Description
    * @param {Post} postId
    * @returns {Promise<void>}
    */
  async likePost(postId) {
    const response = await api.post(`api/posts/${postId}/like`)
    logger.log('👍', response.data)
    //  const indexToUpdate = AppState.likes.findIndex(post=> post.id == postId)
    //  AppState.likes.splice(indexToUpdate, 1)
    //  AppState.likes.push(response.data)

    const index = AppState.posts.findIndex(post => post.id == postId)
    AppState.posts.splice(index, 1, new Post(response.data))
  }



  async getProfilePosts(profileId) {
    AppState.profilePosts = []
    const response = await api.get(`api/posts?creatorId=${profileId}`)
    logger.log("Getting Posts By Creator Id")
    const posts = response.data.posts.map(post => new Post(post))
    AppState.posts = posts
  }



  async updatePosts(postId) {
    const response = await api.put(`api/posts/${postId}`)
    logger.log('Updating Post', response.data)
    const postToUpdate = AppState.posts.findIndex(post => post.id == postId)
    AppState.posts.splice(postToUpdate, 1)

    AppState.posts.push(new Post(response.data))
  }


  async destroyPost(postId) {
    const response = await api.delete(`api/posts/${postId}`)
    logger.log('💣Deleting Post', response.data)
    const posts = AppState.posts
    const postIndex = posts.findIndex(post => post.id == postId)
    if (postIndex == -1) throw new Error("Couldn't find Index")
    posts.splice(postIndex, 1)

  }


}




export const postsService = new PostsService()