<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PostDetailResource extends JsonResource
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
        $attribute    = $this->attribute;
        $user    = $this->user;
        return [
            'id'            => $this->id,
            'title'    => $this->title,
            'thumb'     => $this->thumb,
            'images' => ImageResource::collection($this->whenLoaded('images')), 
            'slug'         => $this->slug,
            'description'         => $this->description,
            'target'      =>$attribute?->target,
            "created_at"=> $this->created_at,
            "expire_at"=> $this->created_at,
            'category'        => [
                "id"=>$this->category->id,
                "name"=>$this->category->name,
                "slug"=>$this->category->slug
            ],
            'address' => [
                'id'      =>$address?->id,
                'city_name'      =>$address?->city_name,
                'district_name'      =>$address?->district_name,
                'ward_name'          =>$address?->ward_name,
                'city_slug'         =>$address?->city_slug,
                'district_slug'       =>$address?->district_slug,
                'ward_slug'  =>$address?->ward_slug,
                'address_detail'  =>$address?->address_detail,
                'map'  =>$address?->map,
            ],
            'area'=>[
              "number"=>  $area?->number,
              "value"=>  $area?->value
            ],
            'price' =>[
                "number"=>  $price?->number,
                "value"=>  $price?->value
              ],
             
            'user'=>[
                'id' => $this->user?->id,
                'name'=>$user->name,
                'phone'=>$user->phone,
                'zalo'=>$user->zalo,
            ]
          
        ];
    }
}