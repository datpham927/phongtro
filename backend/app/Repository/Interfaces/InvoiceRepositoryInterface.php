<?php

namespace App\Repository\Interfaces;
use App\Repository\Interfaces\BaseRepositoryInterface;
interface InvoiceRepositoryInterface  
{ 
    function findAllPaymentHistory($limit=5, $sort=null, $page=1,array $filters=null);
    function findAllDepositHistory($limit=5, $sort=null, $page=1,array $filters=null);
    
}
