<?php
namespace App\Repository\Repositories;
use App\Http\Resources\UserResource;
use App\Models\User;
use App\Repository\Interfaces\UserRepositoryInterface;
use Exception;
use Illuminate\Support\Facades\DB;

class UserRepository implements UserRepositoryInterface
{
    protected $user;
    public function __construct(User $user)
    {
        $this->user = $user;
    }
    public function findAll($limit = 5, $sort = 'id:asc', $page = 1, array $filters = null)
    {

        $query = $this->user->select('users.*', DB::raw('count(p.id) as post_quantity'))
            ->leftJoin('posts as p', 'p.user_id', '=', 'users.id')
            ->groupBy('users.id')
            ->where('users.type', '!=', 'admin');
        // Tính tổng số người dùng và phân trang
        $totalUsers = $query->get()->count();
        $totalPage = ceil($totalUsers / $limit);
        $offset = ($page - 1) * $limit;
        $users = $query->limit($limit)->offset($offset)->get();
        return [
            'totalPage' => intval($totalPage), 
            'currentPage' => intval($page),  
            'totalUser' => intval($totalUsers),  
            'users' =>$users,  
        ];
    }
    


    public function create( $data)
    {
        return $this->user->create($data);
    }

    public function findByIdAndUpdate($id,  $data)
    {
        $user=$this->findById($id);
        if(! $user)throw new Exception("User does not exist!",404);
        $user->update($data);
        return $user;
    }

    public function findById($id, $options = null)
    {
        return $this->user->find($id);
    }
    public function findUserByEmail($email)
    {
        return $this->user::where('email', $email)->first();
    }
    
    public function findByIdAndDelete($id)
    {
        $user=$this->findById($id);
        if(! $user)throw new Exception("User does not exist!",404);
        $user->delete();
        return $user;
    }
    public function findUserByToken($token) {
        $user = $this->user
            ->where('password_reset_token', $token)
            ->whereDate('password_token_expires', '>=', now())
            ->first();
        return $user;
    }
    public function findByIdAndDeposit($uid, $amount) {
        $user = $this->findById($uid); // Tìm người dùng theo ID
        $user->account_balance += intval($amount); // Chuyển $amount thành số nguyên và cộng vào account_balance
        $user->save(); // Lưu thay đổi vào cơ sở dữ liệu
        return $user; // Trả về đối tượng người dùng đã được cập nhật
    }
    
}
