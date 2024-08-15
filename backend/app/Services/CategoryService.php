<?php

use App\Repository\Interfaces\CategoryRepositoryInterface;
use App\Services\Interfaces\CategoryServiceInterface;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;

class CategoryService implements CategoryServiceInterface
{
    protected $categoryRepository;
    public function __construct(CategoryRepositoryInterface $categoryRepository)
    {
        $this->categoryRepository = $categoryRepository;
    }
    public function getAll($request){
           $limit=$request['limit'];
            $page=$request['page'];
            $page=$request['page'];
            $sort=$request['sort'];
            $filter=[];
            $select=null;
         return $this->categoryRepository->findAll($limit, $sort, $page,$filter, $select);
    }
    public function create($request){
            $requestData = $request->all();
            $validator = Validator::make($requestData, [
                'id' => 'required|uuid',
                'name' => 'required|string|max:255',
                'title' => 'required|string|email|max:255',
                'sub_title' => 'required|string|email|max:255',
            ]);
            // Nếu xác thực thất bại, ném ra ngoại lệ
            if ($validator->fails()) { throw new ValidationException($validator);  }
            return $this->categoryRepository->create($requestData);
    }
   
    public function update($request, $id){
        $requestData = $request->all();
        $validator = Validator::make($requestData, [
            'id' => 'required|uuid',
            'name' => 'required|string|max:255',
            'title' => 'required|string|email|max:255',
            'sub_title' => 'required|string|email|max:255',
        ]);
        // Nếu xác thực thất bại, ném ra ngoại lệ
        if ($validator->fails()) { throw new ValidationException($validator);  }
        return $this->categoryRepository->findByIdAndUpdate($id,$requestData);
    }
    public function destroy($id){
        return $this->categoryRepository->findByIdAndDelete($id,);
    }
}