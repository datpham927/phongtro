<?php

namespace App\Service\Services;

use App\Helpers\MyHelper;
use App\Http\Resources\InvoiceResource;
use App\Models\Statistical;
use App\Models\Invoice;
use App\Repository\Interfaces\InvoiceRepositoryInterface;
use App\Service\Interfaces\StatisticalServiceInterface;
use Carbon\Carbon;

class StatisticalService implements StatisticalServiceInterface
{
    protected $invoiceRepository;

    public function __construct(InvoiceRepositoryInterface $invoiceRepository)
    {
        $this->invoiceRepository = $invoiceRepository;
    }

    public function findStatistical($request)
    {
        // Set the date filter
        if ($request['date']) {
            $filter = MyHelper::handleFilterByDate($request['date']);
            $fromDate = Carbon::parse($filter['fromDate'])->format('Y-m-d');
            $toDate = Carbon::parse($filter['toDate'])->format('Y-m-d');
        } else {
            $today = Carbon::now()->toDateString();
            $fromDate = $toDate = $today;
        }

        // Fetch statistical data in one query and aggregate sums
        $statistical = Statistical::whereBetween('transaction_day', [$fromDate, $toDate])->get();
        $totalRevenue = $statistical->sum('total_revenue');
        $transactionsCount= $statistical->sum('total_transactions');
        // Fetch invoices in one query and filter by date and transaction type
        $totalTransactions = Invoice::whereBetween('created_at', [
            Carbon::parse($fromDate)->startOfDay(),  // Chuyển từ ngày đầu tiên của ngày
            Carbon::parse($toDate)->endOfDay()       // Chuyển từ cuối ngày (23:59:59)
        ])
        ->where('transaction_type', 'withdraw')
        ->get();

        return [
            'total_revenue' => $totalRevenue, 
            'transactions_count' => $transactionsCount,
            'statistics' => $statistical,
            'total_transactions' => InvoiceResource::collection($totalTransactions),
        ];
    }
}
