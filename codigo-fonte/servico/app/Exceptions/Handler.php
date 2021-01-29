<?php

namespace App\Exceptions;

use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Throwable;
use App\Traits\ResponseTrait;
use Illuminate\Validation\ValidationException;

class Handler extends ExceptionHandler
{
use ResponseTrait;
    /**
     * A list of the exception types that are not reported.
     *
     * @var array
     */
    protected $dontReport = [
        //
    ];

    /**
     * A list of the inputs that are never flashed for validation exceptions.
     *
     * @var array
     */
    protected $dontFlash = [
        'password',
        'password_confirmation',
    ];

    /**
     * Report or log an exception.
     *
     * @param  \Throwable  $exception
     * @return void
     *
     * @throws \Exception
     */
    public function report(Throwable $exception)
    {
        parent::report($exception);
    }

    /**
     * Render an exception into an HTTP response.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Throwable  $exception
     * @return \Symfony\Component\HttpFoundation\Response
     *
     * @throws \Throwable
     */
    public function render($request, Throwable $exception)
    {
        if($request->is("api/*") && $exception instanceof ValidationException) {
            $erros = '- ';
            foreach($exception->errors() as $k1 => $d1) {
                foreach($d1 as $k2 => $d2) {
                    $erros .= $d2 . ' - ';
                }
            }
            return $this->sendResponse(
                true,
                __($erros),
                $exception->status
            );
        }
        
        return parent::render($request, $exception);
    }
}
