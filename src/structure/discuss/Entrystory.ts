import axios from "axios"

import { Client } from "../../client/Client"

import { Base } from "../Base"
import { Entrystory } from "../category/Entrystory"
import { User } from "../User"

import { REPLY } from "../../graphql/discuss"

import { error } from "../../lib/chalk"
import getImgUrl from "../../lib/get-img-url"

export class EntrystoryDiscuss extends Base {

  id: string = ""
  category: Entrystory
  content: string = ""
  created: Date = new Date()
  author: User
  sticker: string = ""
  like: number = 0

  constructor(
    client: Client,
    data: any
  ){
    super(client)

    this.category = new Entrystory(client)
    this.author = new User(client, {})

    if (data != {}) {
      this.id = data.id
      this.content = data.content
      this.created = new Date(data.created)
      this.author = new User(client, data.user)
      this.sticker = (data.sticker?.filename ? getImgUrl(data.sticker) : "")
      this.like = (data.likesLength ? Number(data.likesLength) : 0)
    }
  }

  async reply(content) {
    if (!this.sid)
      return console.error(error("로그인을 먼저 해주시기 바랍니다."))
    
    let response: any
    
    try {
      response = await axios.post(
        "https://playentry.org/graphql",
        {
          query: REPLY,
          variables: {
  "content": content,
  "image": null,
  "sticker": null,
  "target": this.id,
  "targetSubject": "discuss",
  "targetType": "individual"
}
        },
        {
        headers: { Cookie: `ETR_SID=${this.sid};` }
        }
      )
    } catch (err) {
      console.log(err)
      console.error(error("알 수 없는 Error: 댓글을 쓰는 데 실패했습니다."))
      return
    }

    if (response.data.errors) {
      console.error(error(`${response.data.errors[0].statusCode} Error: 댓글을 쓰는 데 실패했습니다.`))
    }
  }
  
}