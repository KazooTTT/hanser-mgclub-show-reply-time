interface PostItem {
  id: number;
  title: string;
  content: string;
  hanserLike: boolean;
  hanserReply: boolean;
  last_reply_time: string;
  last_reply_user: number;
  post_time: string;
  likes: number;
  replies: number;
  readings: number;
  type: number;
  role: number;
  exp: number;
  auth: number;
  authentication: string;
  tags: any[];
  labels: any[];
  videos: any[];
  author: Author;
  liked: boolean;
  pictures: string[];
  primaryPictures: string[];
}

interface Author {
  uid: number;
  nickname: string;
  avatar: string;
  role: number;
  status: number;
  exp: number;
  auth: number;
  authentication: string;
}

interface NewXMLHttpRequest extends XMLHttpRequest {
  originalSend: typeof XMLHttpRequest.send;
}
