<?php

namespace App\Http\Controllers;

use App\Constants\Messages;
use App\Services\Service;
use App\Traits\ResponseTrait;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller as BaseController;

class Controller extends BaseController
{
    use AuthorizesRequests, ValidatesRequests, ResponseTrait;

    /** @var Service $service */
    public $service;

    public function index(Request $request)
    {
        return $this->sendResponse($this->service->getPaginate($request->all()), __('responses.success.list'));
    }

    public function show($id)
    {
        return $this->sendResponse($this->service->find($id), __('responses.success.show'));
    }

    public function destroy($id)
    {
        return $this->sendResponse($this->service->delete($id), __(Messages::MSG006));
    }
}
