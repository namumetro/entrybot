export const SIGN_IN = `mutation (
  $username: String!,
  $password: String!,
) { 
  signinByUsername (
    username: $username, 
    password: $password
  ) {
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