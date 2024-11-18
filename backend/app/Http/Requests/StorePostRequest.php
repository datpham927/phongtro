<?php
namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StorePostRequest extends FormRequest
{
    public function authorize()
    {
        return true;  // Cho phép tất cả người dùng truy cập
    }

    public function rules()
    {
        return [
            'user_id' => 'required|string|max:255',
            'title' => 'required|string|max:255',
            'thumb' => 'required|url',
            'description' => 'required|string',
            'category_id' => 'required|uuid',
            'images' => 'required|array|min:1',
            'images.*' => 'url',
            'area' => 'required|array',
            'area.number' => 'required|integer|min:1',
            'area.value' => 'required|string',
            'price' => 'required|array',
            'price.number' => 'required|numeric|min:0',
            'price.value' => 'required|string ',
            'expire_at' => 'required|string',
            'address' => 'required|array',
            'address.city_name' => 'required|string',
            'address.district_name' => 'required|string',
            'address.ward_name' => 'required|string',
            'address_detail' => 'required|string',
            'map' => 'nullable|string',
            "target" => 'required|string',
            "post_type_id" => 'required|string'
        ];
    }
}
