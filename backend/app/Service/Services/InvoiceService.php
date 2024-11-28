<?php

namespace App\Service\Services;

use App\Repository\Interfaces\InvoiceRepositoryInterface;
use App\Service\Interfaces\InvoiceServiceInterface;

class InvoiceService implements InvoiceServiceInterface
{
    
    protected $invoiceRepository;
    public function __construct(InvoiceRepositoryInterface $invoiceRepository)
    {
        $this->invoiceRepository = $invoiceRepository;
    }
    public function findAll($request)
    {
        $limit = $request['limit'];
        $page = $request['page'];
        $sort = $request['sort']; 
        $filter['user_id'] = $request['user_id'];
        $invoices = $this->invoiceRepository->findAll($limit, $sort, $page ,$filter);
        return $invoices;
    
    }
 
}
