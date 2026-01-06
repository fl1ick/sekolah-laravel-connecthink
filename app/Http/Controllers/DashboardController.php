<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Kelas;

class DashboardController extends Controller
{
    public function index()
    {
        $kelas = Kelas::with([
            'siswa:id,kelas_id,nama_siswa,tanggal_lahir,alamat',
            'guru:id,kelas_id,nama_guru,mengajar',
        ])->get();

        return Inertia::render('Dashboard', [
            'kelas' => $kelas,
        ]);
    }
}
