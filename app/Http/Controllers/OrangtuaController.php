<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Orangtua;
use App\Models\Siswa;

class OrangtuaController extends Controller
{
    public function index()
    {
        return Inertia::render('Orangtua/Index', [
            'orangtua' => Orangtua::with('siswa')->get(),
        ]);
    }
    public function store(Request $request)
    {
        $request->validate([
            'nama_orangtua' => 'required|string|max:255',
        ]);

        Orangtua::create($request->all());
    
    }

    public function update(Request $request, Orangtua $orangtua)
    {
        $request->validate([
            'nama_orangtua' => 'required|string|max:255',
        ]);

        $orangtua->update($request->only(
            'nama_orangtua',
        ));

        return redirect()->back()->with('success', 'Orangtua berhasil diupdate');
    }
    public function destroy(Orangtua $orangtua)
    {
        $orangtua->delete();
        return redirect()->back()->with('success', 'Guru berhasil dihapus');
    }
}
