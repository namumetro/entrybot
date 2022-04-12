import { EventEmitter } from "events"
import axios from "axios"

import { User } from "../structure/User"

import { Entrystory } from "../structure/category/Entrystory"

import { EntrystoryDiscuss } from "../structure/discuss/Entrystory"

import { SIGN_IN } from "../graphql/sign"
import { SELECT_ENTRYSTORY } from "../graphql/discuss"
import { FIND_USER_BY_USERNAME, FIND_USER_BY_NICKNAME } from "../graphql/user"

import { error } from "../lib/chalk"

export class Client extends EventEmitter {

  private lastMsgId: string = ""
  sid: string = ""
  user: User
  category: {
    entrystory: Entrystory
  } = {
    entrystory: new Entrystory(this)
  }

  constructor() {
    super()

    this.user = new User(this, {})

    this.on("ready", () => {
      this.category = {
        entrystory: new Entrystory(this)
      }
      
      setInterval(async () => {
        let response

        try {
          response = await axios.post("https://playentry.org/graphql", {
            query: SELECT_ENTRYSTORY,
            variables: {
  "category": "free",
  "searchType": "scroll",
  "term": "all",
  "discussType": "entrystory",
  "pageParam": {
    "display": 1,
    "sort": "created"
  }
}
          })
        } catch (err) {
          console.error(error("알 수 없는 Error: 게시물을 가져오는 데 실패했습니다."))
          return
        }

        if (response.data.errors) {
          console.error(error(`${response.data.errors[0].statusCode} Error: 게시물을 가져오는 데 실패했습니다.`))
        } else {
          const msg = response.data.data.discussList.list[0]
          if (msg.id !== this.lastMsgId) {
            this.lastMsgId = msg.id
            this.emit("message", new EntrystoryDiscuss(this, msg))
          }
        }
      }, 500)
    })
  }

  async findUserByUsername(username: string): Promise<User | null> {
    let response: any

    try {
      response = await axios.post(
        "https://playentry.org/graphql", 
        {
          query: FIND_USER_BY_USERNAME,
          variables: {
            username
          }
        },
        {
          headers: {
            Cookie: `ETR_SID=${this.sid};`
          }
        }
      )
    } catch (err) {
      return null
    }
    
    if (response.data.errors) {
      return null
    }
    return response.data.data?.user?.id ? new User(this, response.data.data?.user) : null
  }

  async findUserByNickname(nickname: string): Promise<User | null> {
    let response: any

    try {
      response = await axios.post(
        "https://playentry.org/graphql", 
        {
          query: FIND_USER_BY_NICKNAME,
          variables: {
            nickname
          }
        },
        {
          headers: {
            Cookie: `ETR_SID=${this.sid};`
          }
        }
      )
    } catch (err) {
      return null
    }
    
    if (response.data.errors) {
      return null
    }
    return response.data.data?.user?.id ? new User(this, response.data.data?.user) : null
  }

  async timebot(message: string | () => string): Promise<void> {
    
  }
  
  async login(username: string, password: string): Promise<User | void> {
    let response: any
    
    try {
      response = await axios.post("https://playentry.org/graphql", {
        query: SIGN_IN,
        variables: {
          username,
          password
        }
      })
    } catch (err) {
      //console.error(err)
      console.error(error("알 수 없는 Error: 로그인 실패."))
      return
    }
    if (response.data.errors) {
      console.error(error(`${response.data.errors[0].statusCode} Error: 로그인 실패`))
    } else {
      const user = new User(this, response.data.data.signinByUsername)
      this.sid = response.headers['set-cookie'].join(' ').match(/ETR_SID=(?<sid>[^;]+);/).groups.sid
      this.user = user
      this.emit("ready")
      return user
    }
  }
  
}