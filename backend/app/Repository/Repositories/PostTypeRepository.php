<?php

namespace App\Repository\Repositories;

use App\Models\PostType;
use App\Repository\Interfaces\PostTypeRepositoryInterface;
use Exception;
use Illuminate\Support\Facades\DB;

class PostTypeRepository implements PostTypeRepositoryInterface
{
    protected $postType;
    public function __construct(PostType $postType)
    {
        $this->postType = $postType;
    }    
    public function findAll($limit = 5, $sort = 'asc', $page = 1, array $filters = null, $select = null)
    {
        return  $this->postType->get();  
    }
    public function findByIdAndUpdate($id,  $data)
    {
        $postType=$this->findById($id);
        if(!$postType)throw new Exception("PostType does not exist!",404);
        $postType->update($data);
        return $postType;
    }
    public function findById($id, $options = null)
    {
        return $this->postType->find($id);
    }  
    public function create( $data) { }
    public function findByIdAndDelete($id) {  } 
    
}