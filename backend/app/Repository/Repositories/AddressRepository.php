<?php

namespace App\Repository\Repositories;

use App\Http\Resources\PostDetailResource;
use App\Http\Resources\PostResource;
use App\Models\Post_address;
use App\Repository\Interfaces\AddressRepositoryInterface;
use App\Repository\Interfaces\PostRepositoryInterface;
use Exception;
use Illuminate\Support\Facades\DB;

class AddressRepository  implements AddressRepositoryInterface
{
    protected $address;

    public function __construct(Post_address $address)
    {
        $this->address = $address;
    }
    public function findDistrictByCitySlug($city_slug) {
        return $this->address::where('city_slug', $city_slug)
            ->select('district_name', 'district_slug', DB::raw('COUNT(*) as quantity'))
            ->groupBy('district_name', 'district_slug')
            ->get();
     }
    
    
    public function findWardByDistrictSlug($district_slug) {
        return $this->address::where('district_slug', $district_slug)
            ->select('ward_name', 'ward_slug', DB::raw('COUNT(*) as quantity'))
            ->groupBy('ward_name', 'ward_slug')
            ->get();
    }
    
 
}