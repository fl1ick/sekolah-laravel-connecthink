<?php

namespace App\Http\Controllers;

use App\Models\Siswa;
use App\Models\Kelas;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SiswaController extends Controller
{
    public function index()
    {
        return Inertia::render('Siswa/Index', [
            'siswa' => Siswa::with('kelas')->get(),
            'kelas' => Kelas::all(),
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'nama_siswa' => 'required|string|max:255',
            'alamat' => 'required|string|max:255',
            'tanggal_lahir' => 'required|date',
            'kelas_id' => 'required|exists:kelas,id',
        ]);

        Siswa::create($request->only(
            'nama_siswa',
            'alamat',
            'tanggal_lahir',
            'kelas_id'
        ));

        return redirect()->back()->with('success', 'Siswa berhasil ditambahkan');
    }

    public function update(Request $request, Siswa $siswa)
    {
        $request->validate([
            'nama_siswa' => 'required|string|max:255',
            'alamat' => 'required|string|max:255',
            'tanggal_lahir' => 'required|date',
            'kelas_id' => 'required|exists:kelas,id',
        ]);

        $siswa->update($request->only(
            'nama_siswa',
            'alamat',
            'tanggal_lahir',
            'kelas_id'
        ));

        return redirect()->back()->with('success', 'Siswa berhasil diupdate');
    }

    public function destroy(Siswa $siswa)
    {
        $siswa->delete();
        return redirect()->back()->with('success', 'Siswa berhasil dihapus');
    }
}


