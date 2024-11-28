<?php
namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PostResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $postType= $this->postType;
        return [
            'id' => $this->id,
            'title' => $this->title,
            'thumb' => $this->thumb,
            'slug' => $this->slug,
            'description' => $this->description,
            "created_at" => $this->created_at,
            "expire_at" => $this->expire_at,
            "priority"=>$postType->priority,
            'address' => [
                'city_name' => $this->address?->city_name,
                'district_name' => $this->address?->district_name,
                'ward_name' => $this->address?->ward_name,
                'city_slug' => $this->address?->city_slug,
                'district_slug' => $this->address?->district_slug,
                'ward_slug' => $this->address?->ward_slug,
            ],
            'area' => [
                'number' => $this->area?->number,
                'value' => $this->area?->value,
            ],
            'price' => [
                'number' => $this->price?->number,
                'value' => $this->price?->value,
            ],
            'user' => [
                'id' => $this->user?->id,
                'name' => $this->user?->name,
                'phone' => $this->user?->phone,
                'avatar' => $this->user?->avatar,
            ],
            "images" => $this->images->count(),
            "is_approved" => $this->is_approved,
        ];
    }
}

