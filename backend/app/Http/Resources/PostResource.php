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
        return [
            'id' => $this->id,
            'title' => $this->title,
            'thumb' => $this->thumb,
            'slug' => $this->slug,
            'description' => $this->description,
            "created_at" => $this->created_at,
            "expire_at" => $this->attribute->expire,
            'address' => [
                'city_name' => $this->address?->city_name,
                'district_name' => $this->address?->district_name,
                'ward_name' => $this->address?->ward_name,
                'city_slug' => $this->address?->city_slug,
                'district_slug' => $this->address?->district_slug,
                'ward_slug' => $this->address?->ward_slug,
            ],
            'area' => [
                'order' => $this->area?->order,
                'value' => $this->area?->value,
            ],
            'price' => [
                'order' => $this->price?->order,
                'value' => $this->price?->value,
            ],
            'user' => [
                'name' => $this->user?->name,
                'phone' => $this->user?->phone,
                'avatar' => $this->user?->avatar,
            ],
            "images" => $this->images->count(),
        ];
    }
}

