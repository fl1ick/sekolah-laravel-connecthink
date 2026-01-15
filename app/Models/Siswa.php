<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Siswa extends Model
{
    protected $table = 'siswa';

    protected $fillable = [
        'nama_siswa',
        'alamat',
        'tanggal_lahir',
        'kelas_id',
        'orangtua_id',
    ];
     protected $casts = [
        'tanggal_lahir' => 'date',
    ];

    public function kelas()
    {
        return $this->belongsTo(Kelas::class, 'kelas_id');
    }
    public function orangtua()
    {
        return $this->belongsTo(Orangtua::class, 'orangtua_id');
    }
}
