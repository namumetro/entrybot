import { Client } from "../client/Client"

export class Base {

  sid: string
  
  constructor(public client: Client){
    this.sid = client.sid
  }

}