<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Guru;
use App\Models\Kelas;

class GuruController extends Controller
{
    public function index()
    {
        return Inertia::render('Guru/Index', [
            'guru' => Guru::with('kelas')->get(),
            'kelas' => Kelas::all(),
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'nama_guru' => 'required|string|max:255',
            'Mengajar' => 'required|string|max:255',
            'kelas_id' => 'required|exists:kelas,id',
        ]);

        Guru::create($request->only(
            'nama_guru',
            'Mengajar',
            'kelas_id'
        ));

        return redirect()->back()->with('success', 'Guru berhasil ditambahkan');
    }

    public function update(Request $request, Guru $guru)
    {
        $request->validate([
            'nama_guru' => 'required|string|max:255',
            'Mengajar' => 'required|string|max:255',
            'kelas_id' => 'required|exists:kelas,id',
        ]);

        $guru->update($request->only(
            'nama_uru',
            'Mengajar',
            'kelas_id'
        ));

        return redirect()->back()->with('success', 'Guru berhasil diupdate');
    }

    public function destroy(Guru $guru)
    {
        $guru->delete();
        return redirect()->back()->with('success', 'Guru berhasil dihapus');
    }
}


