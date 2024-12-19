<?php

namespace App\Service\Interfaces;

interface InvoiceServiceInterface
{

    public function findAllPaymentHistory($request);  
    public function findAllDepositHistory($request);  
}
