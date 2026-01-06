<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Siswa;
use App\Models\Kelas;
use Faker\Factory as Faker;

class SiswaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = Faker::create();
        $kelasId = Kelas::pluck('id'); 

        foreach(range(1, 20) as $index) {
            Siswa::create([
                'nama_siswa' => $faker->name(),
                'alamat' => $faker->address(),
                'tanggal_lahir' => $faker->date('Y-m-d', '2007-12-31'),
                'kelas_id' => $kelasId->random(),
            ]);
        }
    }
}
