import { useState } from 'react'
import { useForm } from '@inertiajs/react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

interface Kelas {
    id: number
    nama_kelas: string
}

interface Guru {
    id: number
    nama_guru: string
    mengajar: string
    kelas_id: number
    kelas: Kelas
}

export default function Index({
    guru = [],
    kelas = [],
}: {
    guru: Guru[]
    kelas: Kelas[]
}) {
    const [editId, setEditId] = useState<number | null>(null)

    const { data, setData, post, put, delete: destroy, reset } = useForm({
        nama_guru: '',
        mengajar: '',
        kelas_id: '',
    })

    const submit = (e: React.FormEvent) => {
        e.preventDefault()

        if (editId) {
            put(`/guru/${editId}`, {
                onSuccess: () => {
                    reset()
                    setEditId(null)
                },
            })
        } else {
            post('/guru', {
                onSuccess: () => reset(),
            })
        }
    }

    const edit = (item: Guru) => {
    setEditId(item.id)
    setData('nama_guru', item.nama_guru)
    setData('mengajar', item.mengajar)
    setData('kelas_id', String(item.kelas_id))
}

    return (
        <div className="p-6 space-y-6">
            <h1 className="text-2xl font-semibold">Data guru</h1>
            
            <form onSubmit={submit} className="grid grid-cols-5 gap-2 max-w-4xl">
                <Input
                    placeholder="Nama guru"
                    value={data.nama_guru}
                    onChange={(e) => setData('nama_guru', e.target.value)}
                />
                <Input
                    placeholder="mengajar"
                    value={data.mengajar}
                    onChange={(e) => setData('mengajar', e.target.value)}
                />
                <select
                    className="border rounded px-2"
                    value={data.kelas_id}
                    onChange={(e) => setData('kelas_id', e.target.value)}
                >
                    <option value="">Pilih Kelas</option>
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
            <table className="w-full border">
                <thead>
                    <tr>
                        <th className="border p-2">No</th>
                        <th className="border p-2">Nama</th>
                        <th className="border p-2">mengajar</th>
                        <th className="border p-2">Kelas</th>
                        <th className="border p-2">Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    {guru.map((s, i) => (
                        <tr key={s.id}>
                            <td className="border p-2">{i + 1}</td>
                            <td className="border p-2">{s.nama_guru}</td>
                            <td className="border p-2">{s.mengajar}</td>
                            <td className="border p-2">
                                {s.kelas?.nama_kelas}
                            </td>
                            <td className="border p-2 space-x-2">
                                <Button size="sm" onClick={() => edit(s)}>
                                    Edit
                                </Button>
                                <Button
                                    size="sm"
                                    variant="destructive"
                                    onClick={() =>
                                        destroy(`/guru/${s.id}`)
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
    )
}
