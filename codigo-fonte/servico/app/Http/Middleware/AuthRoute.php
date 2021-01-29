<?php

namespace App\Http\Middleware;

use App\Constants\Messages;
use App\Traits\ResponseTrait;
use Closure;
use Illuminate\Http\Request;
use Tymon\JWTAuth\Exceptions\JWTException;
use Tymon\JWTAuth\Exceptions\TokenExpiredException;
use Tymon\JWTAuth\Exceptions\TokenInvalidException;
use Tymon\JWTAuth\Facades\JWTAuth;
use Tymon\JWTAuth\Http\Middleware\BaseMiddleware;


class AuthRoute extends BaseMiddleware
{
    use ResponseTrait;

    /**
     * Handle an incoming request.
     *
     * @param Request $request
     * @param Closure $next
     * @return mixed
     */
    public function handle($request, Closure $next, $guard = 'api')
    {
        try {
            $user = JWTAuth::parseToken()->authenticate();
            return $next($request);
            // Se o token for expirado
        } catch (TokenExpiredException $e) {
            return $this->sendResponse(
                false,
                __(Messages::MSG096),
                500
            );
            // Se o token for inválido
        } catch (TokenInvalidException $e) {
            return $this->sendResponse(
                false,
                __(Messages::MSG095),
                500
            );
            // Se o token não for encontrado
        } catch (JWTException $e) {
            return $this->sendResponse(
                false,
                __(Messages::MSG097),
                500
            );
        }
    }
}
