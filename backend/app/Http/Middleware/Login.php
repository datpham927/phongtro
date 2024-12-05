<?php

namespace App\Http\Middleware;

use App\Models\User;
use Closure;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class Login
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function handle(Request $request, Closure $next): Response
    {
        $authorizationHeader = $request->header('Authorization');
        $userId = $request->header('client_id');
        if (!$authorizationHeader || !str_starts_with($authorizationHeader, 'Bearer ')) {
            return response()->json(['status' => 401, 'message' => 'Authorization header not found or invalid'], 401);
        }
        $accessToken = str_replace('Bearer ', '', $authorizationHeader);
        try {
            $decodedToken = JWT::decode($accessToken, new Key(config('jwt.access_token_secret'), 'HS256'));
        } catch (\Firebase\JWT\ExpiredException $e) {
            return response()->json(['status' => 401, 'message' => 'Token has expired'], 401);
        } catch (\Firebase\JWT\SignatureInvalidException $e) {
            return response()->json(['status' => 401, 'message' => 'Invalid token signature'], 401);
        } catch (\Exception $e) {
            return response()->json(['status' => 401, 'message' => 'Failed to decode token'], 401);
        }
        $findUser = User::find($decodedToken->user_id);
        if (!$findUser) {
            return response()->json(['status' => 404, 'message' => 'User not found'], 404);
        }
        // if ($userId != $findUser->id) {
        //     return response()->json(['status' => 403, 'message' => 'Invalid user'], 403);
        // }
        // Add user ID to request
        $request["user_id"]= $findUser->id;
        return $next($request);
    }
}
