import axios from "axios"

import { Client } from "../../client/Client"

import { Base } from "../Base"
import { EntrystoryDiscuss } from "../discuss/Entrystory"

import { error } from "../../lib/chalk"

export class Entrystory extends Base {
  
  constructor(client: Client) {
    super(client)
  }

  async write(message: string): Promise<EntrystoryDiscuss | void> {
    let response: any

    try {
      response = await axios.post(
        "https://playentry.org/graphql",
        {
          query: WRITE,
          variables: 
        },
        {
          headers: {
            Cookie: `ETR_SID=${this.sid};`
          }
        }
      )
    } catch (err) {
      console.log(error("알 수 없는 Error: 게시물을 쓰는 데 실패했습니다."))
      return
    }
    if (response.data.errors) {
      console.log(error(`${response.data.errors[0].statusCode} Error: 게시물을 쓰는 데 실패했습니다.`))
    } else {
      return new EntrystoryDiscuss(this.client, response.data.data)
    }
  }
  
}