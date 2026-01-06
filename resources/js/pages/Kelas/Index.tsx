import { useState } from 'react';
import { useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface Kelas {
    id: number;
    nama_kelas: string;
}

export default function Index({ kelas = [] }: { kelas: Kelas[] }) {
    const [editId, setEditId] = useState<number | null>(null);

    const { data, setData, post, put, delete: destroy, reset } = useForm({
        nama_kelas: '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();

        if (editId) {
            put(`/kelas/${editId}`, {
                onSuccess: () => {
                    reset();
                    setEditId(null);
                },
            });
        } else {
            post('/kelas', {
                onSuccess: () => reset(),
            });
        }
    };

    const startEdit = (item: Kelas) => {
        setEditId(item.id);
        setData('nama_kelas', item.nama_kelas);
    };

    return (
        <div className="p-6 space-y-6">
            <h1 className="text-2xl font-semibold">Data Kelas</h1>

            {/* Form Tambah / Edit */}
            <form onSubmit={submit} className="flex gap-2 max-w-md">
                <Input
                    placeholder="Nama Kelas"
                    value={data.nama_kelas}
                    onChange={(e) => setData('nama_kelas', e.target.value)}
                />
                <Button type="submit">
                    {editId ? 'Update' : 'Tambah'}
                </Button>
                {editId && (
                    <Button
                        type="button"
                        variant="secondary"
                        onClick={() => {
                            reset();
                            setEditId(null);
                        }}
                    >
                        Batal
                    </Button>
                )}
            </form>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="w-full border">
                    <thead>
                        <tr className="bg-muted">
                            <th className="border p-2">No</th>
                            <th className="border p-2">Nama Kelas</th>
                            <th className="border p-2">Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {kelas.map((item, i) => (
                            <tr key={item.id}>
                                <td className="border p-2 text-center">
                                    {i + 1}
                                </td>
                                <td className="border p-2">
                                    {item.nama_kelas}
                                </td>
                                <td className="border p-2 space-x-2">
                                    <Button
                                        size="sm"
                                        onClick={() => startEdit(item)}
                                    >
                                        Edit
                                    </Button>
                                    <Button
                                        size="sm"
                                        variant="destructive"
                                        onClick={() =>
                                            destroy(`/kelas/${item.id}`)
                                        }
                                    >
                                        Hapus
                                    </Button>
                                </td>
                            </tr>
                        ))}
                        {!kelas.length && (
                            <tr>
                                <td colSpan={3} className="text-center p-4">
                                    Data kosong
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
