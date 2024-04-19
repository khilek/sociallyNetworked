import { AppState } from "../AppState.js"
import { Post } from "../models/Post.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"

class PostsService{

  async getPosts(){
const response = await api.get('api/posts')
logger.log('Getting Posts', response.data)
const posts = response.data.posts.map(post => new Post(post))
AppState.posts = posts

}

async getPostById(postId){
AppState.activePost = null
const response = await api.get(`api/posts/${postId}`)
logger.log('Getting Blogs', response.data)
const foundPost = new Post(response.data)
AppState.activePost = foundPost

}


async searchPosts(searchQuery){
const response = await api.get(`api/posts?query=${searchQuery}`)
logger.log('Searching Posts', response.data)
const posts = response.data.posts.map(postData => new Post(postData))
AppState.searchTerm = searchQuery
AppState.posts = posts 

}

async clearSearch(){
AppState.searchTerm = ''
await this.searchPosts()
}




async changePage(pageNumber){
const response = await api.get(`api/posts?page=${pageNumber}`)
logger.log('Switching Pages', response.data)
const posts = response.data.posts.map(postData => new Post(postData))
AppState.posts = posts
AppState.currentPage = response.data.page
AppState.totalPages = response.data.total_pages


}













// async getProfilePosts(profileId) {
//   // AppState.profilePosts = []
// const response = await api.get(`api/posts?creatorId=${profileId}`)
// logger.log("Getting Posts By Creator Id")
// const posts = response.data.posts.map( post => new Post(post))
// AppState.activeProfile = posts
// }


}




export const postsService = new PostsService()