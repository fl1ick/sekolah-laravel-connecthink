<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Orangtua extends Model
{
    protected $table = 'orangtua';

    protected $fillable = [
        'nama_orangtua',
    ];
    public function siswa()
    {
        return $this->hasMany(Siswa::class);
    }
}
