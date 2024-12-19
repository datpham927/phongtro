<?php

namespace App\Http\Controllers\api;

use App\Helpers\ResponseHelper;
use App\Http\Controllers\Controller;
use App\Service\Interfaces\StatisticalServiceInterface;
use Illuminate\Http\Request;

class StatisticalController extends Controller
{
    private  $invoiceService;
    public function __construct(StatisticalServiceInterface $invoiceService)
    {
        $this->invoiceService = $invoiceService;  
    }
    public function getStatistical(Request $request )
    { 
        try {
            $response= $this->invoiceService->findStatistical($request);
            return ResponseHelper::success($response,"Successfully",200);
        } catch (\Throwable $th) {
            return ResponseHelper::error("Error",$th);
        }
    } 
}
