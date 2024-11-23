<?php

namespace App\Service\Interfaces;

interface ConversationServiceInterface
{
    public function create($request);
    public function findAll( $user_id);
}
