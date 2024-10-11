interface User {
    id: string;
    avatar: string;
    name: string;
  }
  
export interface IConversation {
    userOne: User;
    userTwo: User;
    id: string;
    totalUnreadMessages:number
    update_at:string
    updated_at:string
  }