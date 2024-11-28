<?php

namespace App\Repository\Repositories;

use App\Models\Category;
use App\Models\Invoice;
use App\Repository\Interfaces\InvoiceRepositoryInterface;
use Exception;
use Illuminate\Support\Facades\DB;

class InvoiceRepository implements InvoiceRepositoryInterface
{
    protected $invoice;
    public function __construct(Invoice $invoice)
    {
        $this->invoice = $invoice;
    }    
    public function findAllPaymentHistory($limit = 5, $sort = 'asc', $page = 1, array $filters = null, $select = null)
    {
        $skip = ($page - 1) * $limit;
        $sortby = $sort === "ctime" ? 'desc' : 'asc';
        $query = $this->invoice->where([
            "user_id"=>$filters['user_id'],
            "transaction_type"=>"withdraw",
        ])
        ->orderBy('created_at', $sortby);
        $totalInvoices = (clone $query)->count();
        if ($limit > 0) {  
            $query->skip($skip)->take($limit); 
        }
        $totalPage = $limit > 0 ? ceil($totalInvoices / $limit) : 1; 
        return [
            'totalPage' => intval($totalPage),
            'currentPage' => intval($page),
            'totalInvoices' => intval($totalInvoices),
            'invoices' => $query->get() ?: null,
        ];  
    }
    public function findAllDepositHistory($limit = 5, $sort = 'asc', $page = 1, array $filters = null, $select = null)
    {
        $skip = ($page - 1) * $limit;
        $sortby = $sort === "ctime" ? 'desc' : 'asc';
        $query = $this->invoice->where([
            "user_id"=>$filters['user_id'],
            "transaction_type"=>"deposit",
        ])
        ->orderBy('created_at', $sortby);
        $totalInvoices = (clone $query)->count();
        if ($limit > 0) {  
            $query->skip($skip)->take($limit); 
        }
        $totalPage = $limit > 0 ? ceil($totalInvoices / $limit) : 1; 
        return [
            'totalPage' => intval($totalPage),
            'currentPage' => intval($page),
            'totalInvoices' => intval($totalInvoices),
            'invoices' => $query->get() ?: null,
        ];  
    }
}