<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Kelas;
use App\Models\Siswa;
use App\Models\Guru;

class DashboardController extends Controller
{
    public function index()
    {
            $kelas = Kelas::with([
                'siswa:id,kelas_id,nama_siswa',
                'guru:id,kelas_id,nama_guru,mengajar',
            ])->get();

        return Inertia::render('Dashboard', [
            'kelas' => $kelas,
            'totalSiswa' => Siswa::count(),
            'totalGuru' => Guru::count(),
            'totalKelas' => Kelas::count(),
        ]);
    }

}
