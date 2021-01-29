<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTbPerfil extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tb_perfil', function (Blueprint $table) {
            $table->bigIncrements('cd_perfil')->unsigned()->comment('Código chave da tabela PK, Identity');
            $table->string('nm_perfil', 255)->nullable()->comment('Nome do perfil');
            $table->string('ds_perfil', 255)->nullable()->comment('Descrição do perfil');
            $table->string('ds_competencia', 1000)->nullable()->comment('Descrição da competência do perfil');
            $table->timestamp('ts_criado')->comment('Data da criação do registro');
            $table->timestamp('ts_atualizado')->nullable()->comment('Data da atualização do registro');
            $table->softDeletes('ts_removido');
        });

        DB::table('tb_perfil')->insert([
            'nm_perfil' => 'ADMINISTRADOR',
            'ds_perfil' => 'RESPONSÁVEL PELA GESTÃO DO SISTEMA.',
            'ds_competencia' => '',
            'ts_criado' => new DateTime("2021/01/01"),
            'ts_atualizado' => new DateTime("2021/01/01")
        ]);

    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('tb_perfil');
    }

}
