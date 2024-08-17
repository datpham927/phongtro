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
            'description' => 'required|string|max:1000',
            'category_id' => 'required|uuid',
            'images' => 'required|array|min:1',
            'images.*' => 'url',
            'area' => 'required|array',
            'area.order' => 'required|integer|min:1',
            'area.value' => 'required|string|max:10',
            'price' => 'required|array',
            'price.order' => 'required|numeric|min:0',
            'price.value' => 'required|string|max:50',
            'attribute' => 'required|array',
            'attribute.target' => 'required|string',
            'attribute.type_post' => 'required|string|max:100',
            'attribute.expire' => 'required|string',
            'address' => 'required|array',
            'address.city_name' => 'required|string|max:100',
            'address.district_name' => 'required|string|max:100',
            'address.ward_name' => 'required|string|max:100',
            'address.address_detail' => 'required|string|max:255',
            'address.map' => 'nullable|string',
        ];
    }
}
