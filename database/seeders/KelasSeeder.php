<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Kelas;

class KelasSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
         $kelas = ['X IPA 1', 'X IPA 2', 'XI IPS 1', 'XII IPA 1'];

        foreach ($kelas as $k) {
            Kelas::firstOrCreate([
                'nama_kelas' => $k,
            ]);
        }
    }
}
