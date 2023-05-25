import { createFunction } from "@infojob/functions/createVideo"
import axios from "axios"



export default async function getVideos(text) {
    try {

        const introductionVideo = await createFunction(text)


        return{
            video:introductionVideo.data.data.video_id,
        }

    } catch (error) {
        console.log(error)
        throw error
    }
}