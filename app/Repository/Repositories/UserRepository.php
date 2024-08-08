<?php

namespace App\Repository\Repositories;

use App\Models\User;
use App\Repository\Interfaces\UserRepositoryInterface;

class UserRepository implements UserRepositoryInterface
{
    protected $user;

    public function __construct(User $user)
    {
        $this->user = $user;
    }

    public function getAllWithPaginate($limit)
    {
        return $this->user->latest()->paginate($limit);
    }

    public function getAll()
    {
        return $this->user->all();
    }

    public function create( $data)
    {
        return $this->user->create($data);
    }

    public function findByIdAndUpdate($id,  $data, $options = [])
    {
        $user = $this->user->findOrFail($id);
        $user->update($data);
        return $user;
    }

    public function findById($id, $options = null)
    {
        return $this->user->find($id);
    }

    public function findByIdAndDelete($id)
    {
        $user = $this->user->findOrFail($id);
        $user->delete();
        return $user;
    }
}
