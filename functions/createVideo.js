import axios from "axios";

export const createFunction =async (text)=> axios.post(`https://api.movio.la/v1/video.generate`,{
                "background": "#ffffff",
                "clips": [
                  {
                    "avatar_id": process.env.AVATAR_ID,
                    "avatar_style": "normal",
                    "input_text": text,
                    "offset": {
                      "x": 0,
                      "y": 0
                    },
                    "scale": 1,
                    "voice_id": process.env.VOICE_ID
                  }
                ],
                "ratio": "16:9",
                "test": true,
                "version": "v1alpha"
              
        },{
            headers:{
                "X-Api-Key":process.env.TOKEN_HEY
            },
        })
