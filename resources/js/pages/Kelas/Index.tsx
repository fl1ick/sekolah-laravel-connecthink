import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { useForm } from '@inertiajs/react';
import { useState } from 'react';

interface Kelas {
    id: number;
    nama_kelas: string;
}

export default function Index({ kelas = [] }: { kelas: Kelas[] }) {
    const [editId, setEditId] = useState<number | null>(null);

    const {
        data,
        setData,
        post,
        put,
        delete: destroy,
        reset,
    } = useForm({
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

    const breadcrumbs: BreadcrumbItem[] = [{ title: 'Kelas', href: '/kelas' }];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <div className="space-y-6 p-6">
                <h1 className="text-2xl font-semibold">Data Kelas</h1>

                <form onSubmit={submit} className="flex max-w-md gap-2">
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
                <div className="relative flex-1 overflow-x-auto rounded-xl border border-sidebar-border/70 p-4">
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="border-b">
                                <th className="p-2 text-left">No</th>
                                <th className="p-2 text-left">Nama Kelas</th>
                                <th className="p-2 text-left">Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {kelas.map((item, i) => (
                                <tr key={item.id}>
                                    <td className="p-2 text-left">{i + 1}</td>
                                    <td className="p-2 text-left">
                                        {item.nama_kelas}
                                    </td>
                                    <td className="space-x-2 p-2 text-left">
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
                                    <td colSpan={3} className="p-4 text-center">
                                        Data kosong
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </AppLayout>
    );
}
