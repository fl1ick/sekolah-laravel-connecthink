<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Orangtua;
use Faker\Factory as Faker;

class OrangtuaSeeder extends Seeder
{
    public function run(): void
    {
        $faker = Faker::create();

        foreach (range(1, 20) as $i) {
            Orangtua::create([
                'nama_orangtua' => $faker->name(),
            ]);
        }
    }
}
