import { AppState } from "../AppState.js"
import { Fun } from "../models/Fun.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"

class FunsService{


async getAds(){
const response = await api.get('api/ads')
logger.log("Getting Ads", response.data)
const funs = response.data.map(fun => new Fun(fun))
AppState.funs = funs

}



}

export const funsService = new FunsService()