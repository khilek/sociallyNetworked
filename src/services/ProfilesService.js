import { AppState } from "../AppState.js"
import { Profile } from "../models/Profile.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"


class ProfilesService{


  async getProfileById(profileId){
    AppState.activeProfile = null
  const response = await api.get(`api/profiles/${profileId}`)
  logger.log('Getting Profiles', response.data)
  AppState.activeProfile = new Profile(response.data)
  logger.log('Active Profile', AppState.activeProfile)
  
  }




}

export const profilesService = new ProfilesService()