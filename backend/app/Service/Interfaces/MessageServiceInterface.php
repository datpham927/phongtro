<?php

namespace App\Service\Interfaces;

interface MessageServiceInterface
{
    public function findAllMessages($conversation_id, $user_id);
    public function sendMessage( $request,$conversation_id);
}
