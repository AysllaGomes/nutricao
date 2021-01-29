<?php

namespace App\Policies;

use App\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class DefaultPolicy
{
    use HandlesAuthorization;

    /**
     * @param User $user
     * @return bool
     */
    public function index(User $user)
    {
        return $user->isDipor();
    }

    /**
     * @param User $user
     * @return bool
     */
    public function show(User $user)
    {
        return $user->isDipor();
    }

    /**
     * @param User $user
     * @return bool
     */
    public function store(User $user)
    {
        return $user->isDipor();
    }

    /**
     * @param User $user
     * @return bool
     */
    public function update(User $user)
    {
        return $user->isDipor();
    }

    /**
     * @param User $user
     * @return bool
     */
    public function destroy(User $user)
    {
        return $user->isDipor();
    }
}
