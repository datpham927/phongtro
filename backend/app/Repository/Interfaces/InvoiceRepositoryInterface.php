<?php

namespace App\Repository\Interfaces;
use App\Repository\Interfaces\BaseRepositoryInterface;
interface InvoiceRepositoryInterface  
{ 
    function findAllPaymentHistory($userId);
    function findAllDepositHistory($userId);
    
}
