import React, { memo } from "react";
import { ITransaction } from "../../interfaces/Transaction";
import { formatDate } from "../../utils/format/formatDate";
import { formatNumber } from "../../utils/format/formatNumber";

// Sửa lại kiểu của props
const ItemDepositHistory: React.FC<{ transaction: ITransaction }> = ({ transaction }) => {
  return (
    <ul className="grid grid-cols-6 divide-x border-t border-slate-200">
      <li className="p-2 text-sm text-slate-600 text-center">{formatDate(transaction.created_at)}</li>
      <li className="p-2 text-sm text-slate-600 text-center">{transaction.id}</li>
      <li className="p-2 text-sm text-slate-600 text-center">{formatNumber(transaction.amount)}</li>
      <li className="p-2 text-sm text-slate-600 text-center">{formatNumber(transaction.start_balance)}</li>
      <li className="p-2 text-sm text-slate-600 text-center">{formatNumber(transaction.end_balance)}</li>
      <li className="p-2 text-sm text-slate-600 text-center">{transaction.description}</li>
    </ul>
  );
};

export default memo(ItemDepositHistory);
