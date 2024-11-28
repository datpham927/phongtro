<?php

namespace App\Http\Controllers\api;

use App\Helpers\ResponseHelper;
use App\Http\Controllers\Controller;
use App\Service\Interfaces\InvoiceServiceInterface;
use Illuminate\Http\Request;

class InvoiceController extends Controller
{
    private  $invoiceService;
    public function __construct(InvoiceServiceInterface $invoiceService)
    {
        $this->invoiceService = $invoiceService;  
    }
    public function getAll(Request $request )
    { 
        
        try {
            $response= $this->invoiceService->findAll($request);
            return ResponseHelper::success($response,"Successfully",200);
        } catch (\Throwable $th) {
            return ResponseHelper::error("Error",$th);
        }
    } 
}
