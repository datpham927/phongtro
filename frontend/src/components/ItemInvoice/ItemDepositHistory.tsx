import React, { memo } from "react";
import { ITransaction } from "../../interfaces/Transaction";
import { formatNumber } from "../../utils/format/formatNumber";
import { timeAgo } from "../../utils/format/timeAgo";

const ItemDepositHistory: React.FC<{ transaction: ITransaction }> = ({ transaction }) => {
  return (
    <ul className="grid grid-cols-6 divide-x border-t border-slate-200">
      <li className="p-2 text-sm text-slate-600 text-center">{timeAgo(transaction.created_at)}</li>
      <li className="p-2 text-sm text-slate-600 text-center">{transaction.id}</li>
      <li className="p-2 text-sm text-slate-600 text-center">{formatNumber(transaction.amount)}</li>
      <li className="p-2 text-sm text-slate-600 text-center">{formatNumber(transaction.start_balance)}</li>
      <li className="p-2 text-sm text-slate-600 text-center">{formatNumber(transaction.end_balance)}</li>
      <li className="p-2 text-sm text-slate-600 text-center">{transaction.description}</li>
    </ul>
  );
};

export default memo(ItemDepositHistory);
