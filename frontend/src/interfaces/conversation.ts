interface User {
    id: string;
    avatar: string;
    name: string;
  }
  
export interface IConversation {
    id: string;
    receiver:User,
    totalUnreadMessages:number
    update_at:string
    updated_at:string    
  }