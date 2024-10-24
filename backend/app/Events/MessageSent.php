<?php
namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class MessageSent implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    // public $message;
    // public $sender_id;
    // public $receiver_id;

    // public function __construct($message, $sender_id, $receiver_id)
    // {
    //     $this->message = $message;
    //     $this->sender_id = $sender_id;
    //     $this->receiver_id = $receiver_id;
    // }

    // public function broadcastOn()
    // {
    //     // Tạo một Private Channel với ID của người nhận
    //     return new PrivateChannel('chat.' . $this->receiver_id);
    // }

    // public function broadcastWith()
    // {
    //     return [
    //         'message' => $this->message,
    //         'sender_id' => $this->sender_id,
    //     ];
    // }
  public $message; 
    public $receiver_id;

  public function __construct($message,$receiver_id )
  {
      $this->message = $message; 
      $this->receiver_id = $receiver_id; 

  } 
//   Phương thức này xác định kênh mà sự kiện sẽ được phát sóng. 
  public function broadcastOn()
  {
      return ['chat-'. $this->receiver_id];
  }
// Phương thức này xác định tên sự kiện mà sẽ được sử dụng khi phát sóng.
  public function broadcastAs()
  {
      return 'sendMessage';
  }
}
