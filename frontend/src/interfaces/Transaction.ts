export type ITransaction = {
    amount: string;
    created_at: string;
    description: string;
    end_balance: string;
    id: number;
    start_balance: string;
    transaction_type: "withdraw" | "deposit"; // Giả sử chỉ có 2 loại giao dịch
    updated_at: string;
    user_id: string;
  };
   