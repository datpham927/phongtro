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
        $userId= $request['user_id'];
        $invoices = $this->invoiceRepository->findAllPaymentHistory( $userId);
        return $invoices; 
    }
    public function findAllDepositHistory($request)
    { 
        $userId= $request['user_id'];
        $invoices = $this->invoiceRepository->findAllDepositHistory( $userId);
        return $invoices; 
    }
    
}
