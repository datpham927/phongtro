<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
         return [
            'id'            => $this->id,
            'name'    => $this->name,
            'phone'     => $this->phone,
            "account_balance"=>$this->account_balance,
            'zalo' => $this->zalo, 
            'facebook'         => $this->facebook,
            'avatar'         => $this->avatar,
            'type'         => $this->type,
            'email'         => $this->email,
         ];
    }
}
