export const PATH = {
  HOME: "/",
  HOME__PAGE: "/:category_slug",
  FILTER__PAGE: "/tinh-thanh/:city_slug/:district_slug?/:ward_slug?",
  CATEGORY_FILTER__PAGE: "/:category_slug/:city_slug/:district_slug?/:ward_slug?",
  RESET_PASSWORD: "/reset/:token",
  DETAIL_POST: "chi-tiet/:title/:postId",  
  SYSTEM: "/quan-ly",
  UPDATE_PASSWORD: "doi-mat-khau",
  CREATE_POST: "tao-moi-bai-dang",
  MANAGE_POST: "quan-ly-bai-dang",
  EDIT_ACCOUNT:"thong-tin-tai-khoan",
  DETAIL:"/chi-tiet/",
  // ------- Người cho thuê----------- 
  DEPOSIT_HISTORY:'lich-su-nap-tien',
  PAYMENT_HISTORY:'lich-su-thanh-toan',
  POST_TYPE_LIST:'bang-gia-dich-vu',
  UPDATE_POST_TYPE:'cap-nhat-bang-gia-dich-vu/:ptypeid',

  // -------- Admin ---------- 
  MANAGE_STATISTICAL:"thong-ke-doanh-thu",
  MANAGE_USER: "quan-ly-nguoi-dung",
  UPDATE_USER: "chinh-sua-thong-tin-nguoi-dung/:uid",
  CREATE_USER: "them-nguoi-dung",
  APPROVE_POST:'duyet-bai-dang',
  UPDATE_POST: "chinh-sua-bai-dang/:pid",
  MANAGE_CATEGORY: "quan-ly-danh-muc",
  UPDATE_CATEGORY: "chinh-sua-danh-muc/:cid",
  CREATE_CATEGORY: "them--danh-muc",
  MANAGE_POST_TYPE_LIST:'quan-ly-bang-gia-dich-vu',
  UPDATE_POST_TYPE_LIST: "chinh-sua-gia-dich-vu/:id",

};

export const titleHomePage = {
  title: "Tìm kiếm chỗ thuê ưng ý",
  description:
    "Kênh thông tin Phòng trọ số 1 Việt Nam - Website đăng tin cho thuê phòng trọ, nhà nguyên căn, căn hộ, ở ghép nhanh, hiệu quả với 100.000+ tin đăng và 2.500.000 lượt xem mỗi tháng.",
};

export const location = [
  {
    id: "hcm",
    name: "Phòng trọ Hồ Chí Minh",
    image: "https://phongtro123.com/images/location_hcm.jpg",
    slug: "ho-chi-minh"
  },
  {
    name: "Phòng trọ Hà Nội",
    image: "https://phongtro123.com/images/location_hn.jpg",
    id: "hn",
    slug: "ha-noi"
  },
  {
    name: "Phòng trọ Đà nẵng",
    image: "https://phongtro123.com/images/location_dn.jpg",
    id: "dn",
    slug: "da-nang"
  },
];

export const textInfo = {
  title: "Tại sao lại chọn PhongTro123.com?",
  description:
    "Chúng tôi biết bạn có rất nhiều lựa chọn, nhưng Phongtro123.com tự hào là trang web đứng top google về các từ khóa: ",
  description2:
    "...Vì vậy tin của bạn đăng trên website sẽ tiếp cận được với nhiều khách hàng hơn, do đó giao dịch nhanh hơn, tiết kiệm chi phí hơn",
  statistic: [
    {
      name: "Thành viên",
      value: "116.998+",
    },
    {
      name: "Tin đăng",
      value: "103.348+",
    },
    {
      name: "Lượt truy cập/tháng",
      value: "300.000+",
    },
    {
      name: "Lượt xem/tháng",
      value: "2.500.000+",
    },
  ],
  price: "Chi phí thấp, hiệu quả tối đa",
  comment:
    '"Trước khi biết website phongtro123, mình phải tốn nhiều công sức và chi phí cho việc đăng tin cho thuê: từ việc phát tờ rơi, dán giấy, và đăng lên các website khác nhưng hiệu quả không cao. Từ khi biết website phongtro123.com, mình đã thử đăng tin lên và đánh giá hiệu quả khá cao trong khi chi phí khá thấp, không còn tình trạng phòng trống kéo dài."',
  author: "Anh Khánh (chủ hệ thống phòng trọ tại Tp.HCM)",
  question: "Bạn đang có phòng trọ / căn hộ cho thuê?",
  answer: "Không phải lo tìm người cho thuê, phòng trống kéo dài",
};

export const textContact = {
  image: "https://phongtro123.com/images/support-bg.jpg",
  content: "Liên hệ với chúng tôi nếu bạn cần hỗ trợ:",
  contacts: [
    {
      text: "HỖ TRỢ THANH TOÁN",
      phone: "Điện thoại: 0917686101",
      zalo: "Zalo: 0917686101",
    },
    {
      text: "HỖ TRỢ ĐĂNG TIN",
      phone: "Điện thoại: 0902657123",
      zalo: "Zalo: 0902657123",
    },
    {
      text: "HOTLINE 24/7",
      phone: "Điện thoại: 0917686101",
      zalo: "Zalo: 0917686101",
    },
  ],
};



export const POST_TYPE_COLOR=[
  "#E41B23",
  "#DE178D",
  "#FF6600",
  "#3763E0",
  "#055699"
]