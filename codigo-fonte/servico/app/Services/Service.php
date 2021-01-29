<?php
namespace App\Services;

use \Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;

abstract class Service
{
    protected $model;

    protected $queryBuilder;

    public $message = [];

    public function __construct()
    {
        if (is_null($this->queryBuilder)) {
            $this->queryBuilder = $this->model;
        }
    }

    public function isValid(&$data, $id = null): bool
    {
        return true;
    }

    public function save($data, $id = null)
    {
        try {
            DB::beginTransaction();
            $this->isValid($data, $id);
            $model = $this->model;
            if ($id) {
                $model = $this->model->find($id);
                unset($data['id']);
            }
            $model->populate($data);
            $model->save();
            DB::commit();
            return $model;
        } catch (\Exception $exception) {
            DB::rollBack();
            return $exception;
        }
    }

    public function find($id)
    {
        $data = $this->queryBuilder->where($this->model->getKeyName(), $id)->first();
        if ($data) {
            $data->id = $data->{$this->model->getKeyName()};
        }
        return $data;
    }

    public function isValidDelete($id): bool
    {
        return true;
    }

    public function delete($id)
    {
        try {
            if ($this->isValidDelete($id)) {
                return $this->model->destroy($id);
            }
        } catch (\Exception $e) {
            return $e;
        }
    }

    /**
     * Melhorar forma de adicionar o campo ID na paginacao.
     */
    public function getPaginate($data)
    {
        $collect = collect($data);

        $filter = [];

        foreach($collect as $key => $value){
            if($key !== 'page' && $key !== 'sort')
                $filter[$key] = $value;
        }


        $queryBuilder = $this->queryBuilder
            ->autoQuery($filter)
            ->order(json_decode($collect->pull('order')));
        if ($collect->pull('page')) {
            $paginate = $queryBuilder->paginate(10);
            $itemsTransformed = self::treateDataAddPk($paginate->getCollection());
            $itemsTransformed = $this->treatePaginateData($itemsTransformed);
            return new \Illuminate\Pagination\LengthAwarePaginator(
                $itemsTransformed,
                $paginate->total(),
                $paginate->perPage(),
                $paginate->currentPage(),
                [
                    'path' => \Request::url(),
                    'query' => [
                        'page' => $paginate->currentPage()
                    ]
                ]
            );
        }
        $itemsTransformed = $this->treatePaginateData($queryBuilder->get());
        return self::treateDataAddPk($itemsTransformed);
    }

    public function treatePaginateData($data)
    {
        return $data;
    }

    public function treateDataAddPk($collection)
    {
        try {
            $keyName = $this->model->getKeyName();
            return $collection->map(function ($data, $key) use ($keyName) {
                $data['id'] = $data[$keyName];
                return $data;
            });
        } catch (\Exception $exception) {
            return $exception;
        }
    }
}
