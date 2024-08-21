<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PostResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $address   = $this->address;
        $area    = $this->area;
        $price    = $this->price;
        return [
            'id'            => $this->id,
            'title'    => $this->title,
            'thumb'     => $this->thumb,
            'slug'         => $this->slug,
            'description'         => $this->description,
            'address' => [
                'city_name'      =>$address?->city_name,
                'district_name'      =>$address?->district_name,
                'ward_name'          =>$address?->ward_name,
                'city_slug'         =>$address?->city_slug,
                'district_slug'       =>$address?->district_slug,
                'ward_slug'  =>$address?->ward_slug,
            ],
            'area'  =>$area?->value,
            'price' =>$price?->value
        ];
    }
}