export const FIND_USER_BY_USERNAME = `query ($username: String) {
  user (username: $username) {
        
    id
    nickname
    username
    profileImage {
        
    id
    name
    label {
        
    ko
    en
    ja
    vn

    }
    filename
    imageType
    dimension {
        
    width
    height

    }
    trimmed {
        filename
        width
        height
    }

    }
    status {
        following
        follower
    }
    description
    role

  }
}`

export const FIND_USER_BY_NICKNAME = `query ($username: String) {
  user (nickname: $nickname) {
        
    id
    nickname
    username
    profileImage {
        
    id
    name
    label {
        
    ko
    en
    ja
    vn

    }
    filename
    imageType
    dimension {
        
    width
    height

    }
    trimmed {
        filename
        width
        height
    }

    }
    status {
        following
        follower
    }
    description
    role

  }
}`