<?php

namespace App;

use Mail;
use DateTime;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class Util {

 
  
    public static function sentMail($type, $email, $token, $user = null) {
        $body = str_replace('{app_url}', env('APP_URL'), env("MAIL_$type"));
        $body = str_replace('{app_name}', env('APP_NAME'), $body);
        $body = str_replace('{token}', $token, $body);
        if ($user) {
            $body = str_replace('{user}', $user, $body);
        }
        $subject = ($type == 'WELCOME' ? 'Login Information' : ($type == 'RESET' ? 'Reset Password' : env('APP_NAME') . ' message'));
        
        // Mail::raw($body, function ($message) use($type, $email, $subject) {
        //     $message->from(env('MAIL_SENDER'))->to($email)->subject($subject);
        // });
        /* You need to complete the SMTP Server configuration before you can sent mail
       
        */
    }
 
 
}