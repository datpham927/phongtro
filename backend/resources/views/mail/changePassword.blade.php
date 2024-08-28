<!DOCTYPE html>
<html lang="en">

<head>
    <title>Email thông báo đơn hàng</title>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
</head>

<body>
<div style="width: 100%;">
    <p>Hiệu lực trong 5 phút</p>
    <a href="{{ config('app.client_url') }}reset/{{ $data['token'] }}">Nhấn vào đây để thay đổi mật khẩu!</a>
</div>


</body>

</html>