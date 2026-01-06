<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Guru;
use Faker\Factory as Faker;
use App\Models\Kelas;

class GuruSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = Faker::create();
        $kelasIds = Kelas::pluck('id');

        $mapel = ['Matematika', 'Fisika', 'Biologi', 'Kimia', 'Bahasa Indonesia', 'Sejarah'];

        foreach($kelasIds as $id) {
            Guru::create([
                'nama_guru' => $faker->name(),
                'Mengajar' => $mapel[array_rand($mapel)],
                'kelas_id' => $id,
            ]);
        }
    }
}
