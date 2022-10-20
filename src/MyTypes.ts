export type LikeType ={
  email:string
}

export type CommentProps ={
  email:string
  text:string
  timestamp:Date
  id:string
  User:string
  pic:string
}

export type PostProps = {
    Text: string,
    id:string
      UserName: string,
      Pic:string,
      likes:LikeType[]
      comments:CommentProps[]
      image:string | null,
      timestamp: any
  }

  export type SinglePostProps = {
    text?:string | null,
    UserName: string,
      ProPic:string,
      Img?:string | null,
      time: any
      id:string
      likes:LikeType[]
      comments:CommentProps[]
  }