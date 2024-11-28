<?php

namespace App\Repository\Interfaces;
use App\Repository\Interfaces\BaseRepositoryInterface;
interface InvoiceRepositoryInterface  
{ 
    function findAll($limit=5, $sort=null, $page=1,array $filters=null);
    
}
