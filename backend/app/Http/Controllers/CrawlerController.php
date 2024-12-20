<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Invoice;
use App\Models\Post;
use App\Models\Post_address;
use App\Models\Post_area;
use App\Models\Post_image;
use App\Models\Post_price;
use App\Models\PostType;
use App\Models\Statistical;
use App\Models\User;
use App\Util;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use Symfony\Component\DomCrawler\Crawler;

class CrawlerController  extends Controller
{
   public  $categoryLinks = [
        [
            'url' => 'https://phongtro123.com/cho-thue-phong-tro',
            'name' => 'Cho Thuê Phòng Trọ',
            'title' => 'Cho Thuê Phòng Trọ, Giá Rẻ, Tiện Nghi, Mới Nhất 2024',
            'sub_title' => 'Cho thuê phòng trọ - Kênh thông tin số 1 về phòng trọ giá rẻ, phòng trọ sinh viên, phòng trọ cao cấp mới nhất năm 2024. Tất cả nhà trọ cho thuê giá tốt nhất tại Việt Nam.'
        ], 
        //   [
        //     'url' => 'https://phongtro123.com/nha-cho-thue',
        //     'name' => 'Cho Thuê Nhà Nguyên Căn',
        //     'title' => 'Cho Thuê Nhà Nguyên Căn, Giá Rẻ, Chính Chủ, Mới Nhất 2024',
        //     'sub_title' => 'Cho thuê nhà nguyên căn, nhà riêng: giá rẻ, chính chủ, đầy đủ tiện nghi. Tìm thuê nhà với nhiều mức giá khác nhau, đa dạng loại diện tích. Đăng tin cho thuê nhà nhanh, hiệu quả tại phongtro123.com'
        // ],  
      
         [
            'url' => 'https://phongtro123.com/cho-thue-mat-bang',
            'name' => 'Cho Thuê Mặt Bằng',
            'title' => 'Cho Thuê Mặt Bằng, Giá Rẻ, Chính Chủ, Mới Nhất 2024',
            'sub_title' => 'Cho thuê mặt bằng: giá rẻ, chính chủ, gần chợ, trường học, tiện mở quán ăn, cafe, kinh doanh mọi ngành nghề. Đăng tin cho thuê mặt bằng hiệu quả tại Phongtro123.com'
        ],  
        // [
        //     'url' => 'https://phongtro123.com/tim-nguoi-o-ghep',
        //     'name' => 'Tìm Người Ở Ghép',
        //     'title' => 'Tìm Người Ở Ghép, Tìm Nam Ở Ghép, Tìm Nữ Ở Ghép, Mới Nhất 2024',
        //     'sub_title' => 'Tìm người ở ghép, tìm nam ở ghép, tìm nữ ở ghép, share phòng trọ, tìm chỗ ở ghép cùng, tìm bạn ở ghép, xin ở ghép mới nhất 2024. Đăng tin ở ghép hiệu quả, nhanh chóng nhất...'
        // ],
        // [
        //     'url' => 'https://phongtro123.com/cho-thue-can-ho',
        //     'name' => 'Cho Thuê Căn Hộ',
        //     'title' => 'Cho Thuê Căn Hộ Chung Cư, Giá Rẻ, View Đẹp, Mới Nhất 2024',
        //     'sub_title' => 'Cho thuê căn hộ - Kênh đăng tin cho thuê căn hộ số 1: giá rẻ, chính chủ, đầy đủ tiện nghi. Cho thuê chung cư với nhiều mức giá, diện tích cho thuê khác nhau.'
        // ], 
    ];
    
    public $users=[
        "1f2efcd2-d886-4643-a9e5-f1beb8df0c21",
        "78733a14-7b26-4da0-83c5-77f4032ecfab",
        "cf7066ea-3425-43bd-acb0-5ce512a7998e",
        "f2728809-6b77-47c6-8a59-c6497717995a"
    ];
   
    public function crawler(){
        set_time_limit(20000);
      try {
        DB::beginTransaction();
        foreach ($this->categoryLinks as $categoryLink) {
            $category = Category::create([
                'id'=>Util::uuid(),
                'name' => $categoryLink["name"],
                'slug' => Util::slug($categoryLink["name"]),
                'title' => $categoryLink["title"],
                'sub_title' =>$categoryLink["sub_title"]
            ]);
        $this->crawlerListPost($categoryLink['url'],$category['id'] );
        }
        //  $this->crawlerListPost("https://phongtro123.com/cho-thue-can-ho-chung-cu-mini", "388b3a30-2e16-46db-b160-9f0a1a473f4f");
        //  $this->crawlerListPost("https://phongtro123.com/cho-thue-can-ho-dich-vu", "388b3a30-2e16-46db-b160-9f0a1a473f4f");
      
         DB::commit();
        return response()->json([
            "status"=>"Crawler data thành công"
        ],200);
      } catch (\Throwable $th) {
           DB::rollBack();
           return response()->json([
            "status"=>"Crawler data không thành công",
            "error"=>$th->getMessage()
        ],500); 
      }
    }
    // -- danh sach link sản phẩm
    public function crawlerListPost($categoryUrl, $categoryId) {
        // Lấy nội dung HTML từ URL
        $html = file_get_contents($categoryUrl);   
        // Khởi tạo đối tượng Crawler với HTML
        $crawler = new Crawler($html);
        // Lọc các phần tử có lớp 'post-item tin-vip' 
        $posts = $crawler->filter('.post__listing > li'); 
        // Mảng lưu trữ các liên kết bài viết
        $postLinks = []; 
        // Kiểm tra xem có phần tử nào được lọc không
        if ($posts->count() > 0) {
            // Lặp qua từng phần tử trong $posts
            foreach ($posts as $post) {
                // Tạo một đối tượng Crawler mới cho từng phần tử
                $newCrawler = new Crawler($post);
                // Lấy liên kết và hình ảnh từ phần tử
                 // Kiểm tra các phần tử với bộ chọn
                $linkNode = $newCrawler->filter("figure > a");
                if ($linkNode->count() > 0) {
                    $link = $linkNode->attr('href');
                } else {
                    $link = null; // Hoặc một giá trị mặc định khác
                }
                $postThumbNode = $newCrawler->filter("figure > a > img");
                if ($postThumbNode->count() > 0) {
                    $postThumb = $postThumbNode->attr('data-src');
                } else {
                    $postThumb = null; // Hoặc một giá trị mặc định khác
                }  
                // Kiểm tra nếu có cả liên kết và hình ảnh
                if ($link && $postThumb) {
                    $postLinks[] = [
                        'link' => "https://phongtro123.com" . $link,
                        'post_thumb' => $postThumb,
                    ];
                }
            }
        } else {
            echo "Không tìm thấy bài viết nào trong danh mục.";
        }

        // Xử lý chi tiết các liên kết bài viết
        foreach ($postLinks as $postLink) {
            $this->crawlerDetail($postLink['link'], $postLink['post_thumb'], $categoryId);
        }
    }
    
    // -- lấy chi tiết sản phẩm
    public function crawlerDetail($postLink,$postThumb,$categoryId){
        // $postLink $brand_id  $categoryId  
        $html=file_get_contents($postLink);   
        $crawler=new Crawler( $html);
            // ------------------ ADDRESS ------------------
         // Extract the address detail from the first matched address element
         $addressDetail = $crawler->filter("address.lh-sm")->first()->getNode(0)->childNodes->item(1)->nodeValue;
        // Remove trailing spaces and hyphens from the address detail
        $addressDetail = rtrim($addressDetail, ' -');
        // Split the address string into an array by commas
        $addressArray = explode(', ', $addressDetail);
            // Output the array for debugging
        if( count($addressArray)>3){ 
            $address["id"]=Util::uuid(); 
            $address["city_name"]=$addressArray[3];
            $address["district_name"]= $addressArray[2];
            $address["ward_name"]= $addressArray[1]; 
            $address["city_slug"]= Util::slug($addressArray[3]);
            $address["district_slug"]=Util::slug($addressArray[2]);
            $address["ward_slug"]=Util::slug($addressArray[1]); 
          
        }else{
            $address["id"]=Util::uuid(); 
            $address["city_name"]= explode(', ', $addressDetail)[2];
            $address["district_name"]= explode(', ', $addressDetail)[1];
            $address["ward_name"]= explode(', ', $addressDetail)[0]; 
            $address["city_slug"]= Util::slug(explode(', ', $addressDetail)[2]);
            $address["district_slug"]=Util::slug(explode(', ', $addressDetail)[1]);
            $address["ward_slug"]=Util::slug(explode(', ', $addressDetail)[0]); 
        }

 
       $foundAddress = Post_address::where([
          "city_name"=> $address["city_name"], 
          "district_name"=>  $address["district_name" ],
          "ward_name"=>  $address["ward_name"] 
       ])->first();
       $addressId = '';
       if (empty($foundAddress)) {
           $addressId = $this->createAddress($address)->id; // Truy cập thuộc tính id của đối tượng được trả về bởi createAddress
       } else {
           $addressId = $foundAddress->id; // Truy cập thuộc tính id của đối tượng $foundAddress
       }
         // ------------------ POST ------------------

         $postData["address_detail"]=$addressDetail; 
         $postData["map"]= '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3834.5956177445114!2d108.24024507365495!3d16.034552740368213!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3142175ea43a1001%3A0x1b74ea0a2ed3227b!2zS8O9IHTDumMgeMOhIFNpbmggdmnDqm4gVFAgxJDDoCBO4bq1bmcgLSBQaMOtYSDEkMO0bmc!5e0!3m2!1svi!2s!4v1726499130448!5m2!1svi!2s" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>'; 
         $postData["id"]=Util::uuid();
         $postData["address_id"]=$addressId ;
         $postData["user_id"]= $this->users[rand(0, 3)];
         $postData["category_id"]=$categoryId;
         $postData["title"]=$crawler->filter("header > h1")->text();
         $postData["thumb"]=$postThumb;
         $postData["description"]= $crawler->filter("div.border-bottom.pb-3.mb-4")->eq(0)->html();
         $postData["slug"]=Util::slug($postData["title"]);
         $postData["expire_at"]=Util::getRandomDateFromNow();
         $postData["is_approved"]=true;
         $postTypeId=$this->getRandomElement();
         $postData["post_type_id"]= $postTypeId; 
         $postData["is_approved"]=true;


          //    ----- thanh toán
                // Kiểm tra và lấy loại bài đăng
                $postType = PostType::find($postTypeId); 
                // Kiểm tra số dư tài khoản người dùng có đủ để thanh toán
                $user = User::find($postData["user_id"]); 
                if (!$user ||  $user->account_balance < $postType["price"]) {
                        return response()->json('Insufficient account balance');
                }
                // tạo hóa đơn và trừ tiền
                if($postType["price"]>0){
                    $this->processPostPayment($user, $postType);
                }
         $postData["expire_at"] =Util::addMonthsToCurrentDate($postType['expiration_time']);

         $post= Post::create($postData);
         // -------------  image  ------------- 
         $dataImages = [];
         $images = $crawler->filter("#carousel_Photos > .carousel-inner > .carousel-item > img");
         
         if ($images->count()>0) {
             $images->each(function (Crawler $node) use (&$dataImages) {
                $dataImages[] = [
                     'href' =>$node->attr('data-src'),
                 ];
             });
         } 
         foreach ($dataImages as $item) {
            Post_image::create([
                 'id'=>Util::uuid(),
                "url"=>$item['href'],
                "post_id"=> $post["id"],
            ]);
         }
        //  // ------------------ PRICE ------------------
         $price["id"]=Util::uuid();
         $orderRandom=Util::convertToMillion(Util::randomDecimal());
         $price["number"]= $orderRandom["number"];
         $price["value"]= $orderRandom["value"] ;
          $price["post_id"]= $post["id"];
        //  dd( $price);
         Post_price::create($price);
        // // ------------------ AREA ------------------
         $area["id"]=Util::uuid();
         $area["number"]=Util::randomDecimal( 10, 200,1);
         $area["value"]=$area["number"]. " m2";
         $area["post_id"]= $post["id"];
         Post_area::create($area);

         
    }
    public function createAddress($address){
        $address["id"]=Util::uuid();
        $address["city_slug"]= Util::slug($address[ "city_name"] );
        $address["district_slug"]= Util::slug($address[ "district_name"] );
        $address["ward_slug"]= Util::slug($address[ "ward_name"] );
       return Post_address::create($address);
    }

    
    function getRandomGender() {
        $genders = ['Nam', 'Nữ'];
        return $genders[array_rand($genders)];
    }
    function getRandomElement() {
        $values = ['tinvipnoibat', 'tinvip1', 'tinvip2', 'sdfer8549598fjf485', 'fhdfhueheffueuughyr8'];
        return $values[array_rand($values)];
    }
    protected function processPostPayment($user, $postType)
    {

        $id= Util::uuid();
        $invoiceData = [
            'id' => $id,
            'transaction_type' => 'withdraw',
            'user_id' => $user->id,
            'amount' => $postType["price"],
            'start_balance' => $user->account_balance,
            'end_balance' => $user->account_balance-$postType["price"],
            'description' => "Phí đăng bài " . $postType->name,
        ];

        $invoice = Invoice::create($invoiceData);
        if ($invoice) {
            $user->account_balance -= $postType["price"];
            $user->save(); // Lưu lại thay đổi số dư
            $today = Carbon::now()->toDateString();
            $foundStatistical = Statistical::firstOrNew(['transaction_day' => $today]);
            $foundStatistical->total_transactions += 1;
            $foundStatistical->total_revenue += $postType->price;
            $foundStatistical->save();
        }
    }
    
}