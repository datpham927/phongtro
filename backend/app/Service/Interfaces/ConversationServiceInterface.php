<?php

namespace App\Service\Interfaces;

interface ConversationServiceInterface
{
    public function create($request);
    public function finAll( $user_id);
}
