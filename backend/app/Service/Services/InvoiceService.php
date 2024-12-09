<?php

namespace App\Service\Services;

use App\Helpers\MyHelper;
use App\Http\Resources\InvoiceResource;
use App\Models\Invoice;
use App\Repository\Interfaces\InvoiceRepositoryInterface;
use App\Service\Interfaces\InvoiceServiceInterface;

class InvoiceService implements InvoiceServiceInterface
{
    
    protected $invoiceRepository;
    public function __construct(InvoiceRepositoryInterface $invoiceRepository)
    {
        $this->invoiceRepository = $invoiceRepository;
    }
    public function findAllPaymentHistory($request)
    {
        $limit = $request['limit'];
        $page = $request['page'];
        $sort = $request['sort']; 
        $filter['user_id'] = $request['user_id'];
        $invoices = $this->invoiceRepository->findAllPaymentHistory($limit, $sort, $page ,$filter);
        return $invoices; 
    }
    public function findAllDepositHistory($request)
    {
        $limit = $request['limit'];
        $page = $request['page'];
        $sort = $request['sort']; 
        $filter['user_id'] = $request['user_id'];
        $invoices = $this->invoiceRepository->findAllDepositHistory($limit, $sort, $page ,$filter);
        return $invoices; 
    }
    public function findStatistical($request) {
        // Function helper xử lý ngày
        $formatDate = MyHelper::handleFilterByDate($request->input('date'));
        $fromDate = $formatDate["fromDate"];
        $toDate = $formatDate["toDate"];
        // Default page and limit values
        $page = $request->input('page', 1);
        $limit = $request->input('limit', 5);
        // Query the invoices within the date range
        $invoiceQuery = Invoice::whereBetween('created_at', [$fromDate, $toDate])
                               ->where('transaction_type', 'withdraw');
        // Calculate total amount of the invoices
        $totalAmount = $invoiceQuery->sum('amount');
        // Get total number of invoices
        $totalInvoices = $invoiceQuery->count();
        $distinctCustomers = $invoiceQuery->distinct('user_id')->count();
        // Apply pagination
        $invoices = $invoiceQuery->skip(($page - 1) * $limit)
                                 ->take($limit)
                                 ->get();
        return [
            'total_amount' => $totalAmount,
            'total_invoices' => $totalInvoices,
            'total_customers' => $distinctCustomers,
            'data' => InvoiceResource::collection($invoices),
        ];
    }
}
