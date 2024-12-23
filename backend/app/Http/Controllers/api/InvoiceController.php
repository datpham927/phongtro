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
    public function getAllPaymentHistory(Request $request )
    { 
        
        try {
            $response= $this->invoiceService->findAllPaymentHistory($request);
            return ResponseHelper::success($response,"Thành công",200);
        } catch (\Throwable $th) {
            return ResponseHelper::error("Đã xảy ra lỗi",$th);
        }
    } 
    public function getAllDepositHistory(Request $request )
    { 
        try {
            $response= $this->invoiceService->findAllDepositHistory($request);
            return ResponseHelper::success($response,"Thành công",200);
        } catch (\Throwable $th) {
            return ResponseHelper::error("Đã xảy ra lỗi",$th);
        }
    }  
}
