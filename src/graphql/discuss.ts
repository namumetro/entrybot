export const SELECT_ENTRYSTORY = `query SELECT_ENTRYSTORY(
    $pageParam: PageParam
    $query: String
    $user: String
    $category: String
    $term: String
    $prefix: String
    $progress: String
    $discussType: String
    $searchType: String
    $searchAfter: JSON
){
        discussList(
    pageParam: $pageParam
    query: $query
    user: $user
    category: $category
    term: $term
    prefix: $prefix
    progress: $progress
    discussType: $discussType
    searchType: $searchType
    searchAfter: $searchAfter
) {
            total
            list {
                
	id
    content
    created
    commentsLength
    likesLength
    user {
        
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
    image {
        
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
    sticker {
        
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
    isLike

            }
            searchAfter
        }
    }`

export const REPLY = `mutation CREATE_COMMENT(
        
    $content: String
    $image: String
    $sticker: String
    $target: String
    $targetSubject: String
    $targetType: String
    $groupId: ID

    ) {
        createComment(
            
    content: $content
    image: $image
    sticker: $sticker
    target: $target
    targetSubject: $targetSubject
    targetType: $targetType
    groupId: $groupId

        ) {
            warning
            comment {
                
    id
    user {
        
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
    content
    created
    removed
    blamed
    commentsLength
    likesLength
    isLike
    hide
    image {
        
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
    sticker {
        
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

            }
        }
    }`