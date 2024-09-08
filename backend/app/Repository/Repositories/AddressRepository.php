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
        $locationData = $this->address::where('city_slug', $city_slug)
        ->select('city_name')->first();
        // Tạo query để lấy danh sách các quận
        $districtsQuery = $this->address::where('city_slug', $city_slug)
            ->leftJoin('posts', 'posts.address_id', '=', 'post_addresses.id') // Sử dụng leftJoin để kết nối bảng
            ->select('district_name', 'district_slug', DB::raw('COUNT(posts.id) as quantity')) // Đếm số lượng bài viết
            ->groupBy('district_name', 'district_slug')
            ->orderBy('district_name', 'asc'); // Sắp xếp theo tên quận
        // Lấy danh sách các quận
        $districts = $districtsQuery->get();
        // Sắp xếp dữ liệu theo cấu trúc { city_name, district_list }
        return [
            'city_name' => $locationData->city_name,
            'locations' => $districts
        ];
    }
    


    public function findWardByCityAndDistrictSlug($city_slug, $district_slug) {
        // Lấy thông tin quận và thành phố dựa trên city_slug và district_slug
            $locationData = $this->address::where('city_slug', $city_slug)
            ->where('district_slug', $district_slug)
            ->select('city_name', 'district_name')
            ->first();

        // Lấy danh sách các phường/xã
        $wards = $this->address::where('city_slug', $city_slug)
            ->where('district_slug', $district_slug)
            ->leftJoin('posts', 'posts.address_id', '=', 'post_addresses.id') // Sử dụng leftJoin để kết nối bảng
            ->select('ward_name', 'ward_slug',  DB::raw('COUNT(posts.id) as quantity'))
            ->groupBy('ward_name', 'ward_slug')->orderBy('ward_name', 'asc')->get();
    
            return [
                'city_name' => $locationData->city_name,
                'district_name' => $locationData->district_name,
                'locations' => $wards
            ];
    }
    public function findDistrictBelongCategoryByCitySlug($category_slug, $city_slug){
        $locationData = $this->address::where('city_slug', $city_slug)
        ->select('city_name')->first();
        // Tạo query để lấy danh sách các quận
        $districts = $this->address
        ->join('posts as p', 'p.address_id', '=', 'post_addresses.id')
        ->join('categories as c', 'p.category_id', '=', 'c.id')
        ->select('post_addresses.district_name','post_addresses.district_slug', DB::raw('COUNT(p.id) as quantity'))
        ->where('c.slug', $category_slug)
        ->where('post_addresses.city_slug', $city_slug)
        ->groupBy('post_addresses.district_name','post_addresses.district_slug')
        ->get();
        return [
            'city_name' => $locationData->city_name,
            'locations' => $districts
        ];
     }
    public function findWardBelongCategoryByCityAndDistrictSlug($category_slug,$city_slug, $district_slug) {
        $locationData = $this->address::where('city_slug', $city_slug)
        ->where('district_slug', $district_slug)
        ->select('city_name', 'district_name')
        ->first(); 
        $wards = $this->address
        ->join('posts as p', 'p.address_id', '=', 'post_addresses.id')
        ->join('categories as c', 'p.category_id', '=', 'c.id')
        ->select('post_addresses.ward_name' ,'post_addresses.ward_slug', DB::raw('COUNT(p.id) as quantity'))
        ->where('c.slug', $category_slug)
        ->where('post_addresses.city_slug', $city_slug)
        ->where('post_addresses.district_slug', $district_slug)
        ->groupBy('post_addresses.ward_name','post_addresses.ward_slug')
        ->get(); 
        return [
            'city_name' => $locationData->city_name,
            'district_name' => $locationData->district_name,
            'locations' => $wards
        ];
      }
          public function  findNameWardByWardSlug($ward_slug){
               return  $this->address::where('ward_slug', $ward_slug)->first();
         }
 
         public function findCities() {
            return $this->address
                ->select('city_name', 'city_slug')
                ->selectRaw("'city' as type")
                ->distinct()
                ->get();
        }
        public function  findDistricts($city_slug){
            return $this->address
            ->select('district_name', 'district_slug')
            ->selectRaw("'district' as type")
            ->where("city_slug",$city_slug)
            ->distinct()
            ->get();
        }

        public function  findWards ($district_slug){
            return $this->address
            ->select('ward_name', 'ward_slug')
            ->selectRaw("'ward' as type")
            ->where("district_slug",$district_slug)
            ->distinct()
            ->get();
        }
}