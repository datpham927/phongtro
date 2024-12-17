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
    
}
