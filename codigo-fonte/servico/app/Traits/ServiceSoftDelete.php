<?php

namespace App\Traits;

use Exception;
use Illuminate\Http\Response;
use Illuminate\Pagination\LengthAwarePaginator;

/**
 * Trait ResponseTrait
 * @package App\Traits
 */
trait ServiceSoftDelete
{
    public function setSoftDelete($status = true) : void
    {
        if ($status) {
            $this->queryBuilder = $this->queryBuilder->whereNull('ts_removido');
        }
    }
}
