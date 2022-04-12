import axios from "axios"

import { Client } from "../client/Client"

import { Base } from "./Base"

import getImgUrl from "../lib/get-img-url"

export class User extends Base {

  id: string = ""
  username: string = ""
  nickname: string = ""
  description: string = ""
  profileImage: string = ""
  following: number = 0
  follower: number = 0
  
  constructor(
    client: Client,
    data: any
  ) {
    super(client)

    if (data.id) {
      this.id = data.id
      this.username = data.username
      this.nickname = data.nickname
      this.description = data.description
      this.profileImage = (data.profileImage?.filename ? getImgUrl(data.profileImage) : "")
      this.following = Number(data.status.following)
      this.follower = Number(data.status.follower)
    }
  }
  
}