<?php

namespace Tests\Feature;

/**
 * Class CodigoSipesControllerTest
 * @package tests\Feature\Http\Controller
 */
class ControllerTest extends TestCase
{
    public function testeIndex()
    {
        $response = $this->get('api/perfil', [], $this->getAuthorization());
        $response->assertStatus(200);
    }

    public function testeShow()
    {
        $response = $this->get('api/perfil/'. '1', [], $this->getAuthorization());
        $response->assertStatus(200);
    }

    public function testeDestroy()
    {
        $response = $this->delete('api/perfil/'. '2', [], $this->getAuthorization());
        $response->assertStatus(200);
    }
}
