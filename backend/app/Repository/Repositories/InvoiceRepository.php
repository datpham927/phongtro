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
    public function findAllPaymentHistory(  $userId)
    {  
        $data = $this->invoice->where([
            "user_id"=> $userId,
            "transaction_type"=>"withdraw",
        ])
        ->orderBy('created_at', 'desc')->paginate(5); 
        return [
            'totalPage' =>  ceil($data->total()/5),
            'currentPage' =>$data->currentPage(),
            'totalInvoices' =>  $data->total(),
            'invoices' => $data->items()  
        ];  
    }
    public function findAllDepositHistory( $userId)
    {
        $data = $this->invoice->where([
            "user_id"=> $userId,
            "transaction_type"=>"deposit",
        ])
        ->orderBy('created_at', 'desc')->paginate(5); 
        return [
            'totalPage' =>  ceil($data->total()/5),
            'currentPage' =>$data->currentPage(),
            'totalInvoices' =>  $data->total(),
            'invoices' => $data->items()  
        ];  
    }
}