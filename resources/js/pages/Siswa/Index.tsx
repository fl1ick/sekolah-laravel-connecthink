import { useState } from 'react';
import { useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';


interface Kelas {
    id: number
    nama_kelas: string
}

interface Siswa {
    id: number
    nama_siswa: string
    alamat: string
    tanggal_lahir: string
    kelas_id: number
    kelas: Kelas
}

export default function Index({
    siswa = [],
    kelas = [],
}: {
    siswa: Siswa[]
    kelas: Kelas[]
}) {
    const [editId, setEditId] = useState<number | null>(null)

    const { data, setData, post, put, delete: destroy, reset } = useForm({
        nama_siswa: '',
        alamat: '',
        tanggal_lahir: '',
        kelas_id: '',
    })

    const submit = (e: React.FormEvent) => {
        e.preventDefault()

        if (editId) {
            put(`/siswa/${editId}`, {
                onSuccess: () => {
                    reset()
                    setEditId(null)
                },
            })
        } else {
            post('/siswa', {
                onSuccess: () => reset(),
            })
        }
    }

    const edit = (item: Siswa) => {
    setEditId(item.id)
    setData('nama_siswa', item.nama_siswa)
    setData('alamat', item.alamat)
    setData('tanggal_lahir', item.tanggal_lahir)
    setData('kelas_id', String(item.kelas_id))
    }

    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Siswa', href: '/siswa' },
    ];

    return (
    <AppLayout breadcrumbs={breadcrumbs}>
        <div className="p-6 space-y-6">
            <h1 className="text-2xl font-semibold">Data Siswa</h1>
            
            <form onSubmit={submit} className="grid grid-cols-5 gap-2 max-w-4xl">
                <Input
                    placeholder="Nama Siswa"
                    value={data.nama_siswa}
                    onChange={(e) => setData('nama_siswa', e.target.value)}
                />
                <Input
                    placeholder="Alamat"
                    value={data.alamat}
                    onChange={(e) => setData('alamat', e.target.value)}
                />
                <Input
                    type="date"
                    value={data.tanggal_lahir}
                    onChange={(e) =>
                        setData('tanggal_lahir', e.target.value)
                    }
                />
                <select
                    className="border rounded px-2 border-"
                    value={data.kelas_id}
                    onChange={(e) => setData('kelas_id', e.target.value)}
                >
                    <option className='text-gray-800' value="">Pilih Kelas</option>
                    {kelas.map((k) => (
                        <option key={k.id} value={k.id}>
                            {k.nama_kelas}
                        </option>
                    ))}
                </select>

                <Button type="submit">
                    {editId ? 'Update' : 'Tambah'}
                </Button>
            </form>
            <div className='relative flex-1 overflow-x-auto rounded-xl border border-sidebar-border/70 p-4'>
            <table className="w-full border-collapse ">
                <thead>
                    <tr className='border-b'>
                        <th className="text-left p-2">No</th>
                        <th className="text-left p-2">Nama</th>
                        <th className="text-left p-2">Alamat</th>
                        <th className="text-left p-2">Tgl Lahir</th>
                        <th className="text-left p-2">Kelas</th>
                        <th className="text-left p-2">Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    {siswa.map((s, i) => (
                        <tr key={s.id}>
                            <td className="text-left p-2">{i + 1}</td>
                            <td className="text-left p-2">{s.nama_siswa}</td>
                            <td className="text-left p-2">{s.alamat}</td>
                            <td className="text-left p-2">
                                {s.tanggal_lahir}
                            </td>
                            <td className="text-left p-2">
                                {s.kelas?.nama_kelas}
                            </td>
                            <td className="text-left p-2 space-x-2">
                                <Button size="sm" onClick={() => edit(s)}>
                                    Edit
                                </Button>
                                <Button
                                    size="sm"
                                    variant="destructive"
                                    onClick={() =>
                                        destroy(`/siswa/${s.id}`)
                                    }
                                >
                                    Hapus
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            </div>
        </div>
    </AppLayout>
    )
}
