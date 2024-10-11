import React from 'react';

const NoticeListComponent: React.FC = () => {
  return (
    <div className="card mb-5 bg-yellow-100 border-yellow-200 text-yellow-800 mx-10 mt-10 rounded-sm ">
    <div className="card-body p-4">
      <h4 className="text-xl font-semibold mb-3">Lưu ý khi đăng tin</h4>
      <ul className="list-disc ml-6 space-y-2">
        <li>Nội dung phải viết bằng tiếng Việt có dấu</li>
        <li>Tiêu đề tin không dài quá 100 kí tự</li>
        <li>Các bạn nên điền đầy đủ thông tin vào các mục để tin đăng có hiệu quả hơn.</li>
        <li>Để tăng độ tin cậy và tin rao được nhiều người quan tâm hơn, hãy sửa vị trí tin rao của bạn trên bản đồ bằng cách kéo icon tới đúng vị trí của tin rao.</li>
        <li>Tin đăng có hình ảnh rõ ràng sẽ được xem và gọi gấp nhiều lần so với tin rao không có ảnh. Hãy đăng ảnh để được giao dịch nhanh chóng!</li>
      </ul>
    </div>
  </div>
  
  );
};

export default NoticeListComponent;
