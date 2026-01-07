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

interface Guru {
    id: number;
    nama_guru: string;
    Mengajar: string;
    kelas_id: number;
    kelas: Kelas;
}

export default function Index({
    guru = [],
    kelas = [],
}: {
    guru: Guru[];
    kelas: Kelas[];
}) {
    const [editId, setEditId] = useState<number | null>(null);

    const {
        data,
        setData,
        post,
        put,
        delete: destroy,
        reset,
    } = useForm({
        nama_guru: '',
        Mengajar: '',
        kelas_id: '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();

        if (editId) {
            put(`/guru/${editId}`, {
                onSuccess: () => {
                    reset();
                    setEditId(null);
                },
            });
        } else {
            post('/guru', {
                onSuccess: () => reset(),
            });
        }
    };

    const edit = (item: Guru) => {
        setEditId(item.id);
        setData('nama_guru', item.nama_guru);
        setData('Mengajar', item.Mengajar);
        setData('kelas_id', String(item.kelas_id));
    };

    const guruPerKelas = guru.reduce((acc: Record<number, Guru[]>, item) => {
        if (!item.kelas) return acc;

        if (!acc[item.kelas.id]) {
            acc[item.kelas.id] = [];
        }

        acc[item.kelas.id].push(item);
        return acc;
    }, {});

    const breadcrumbs: BreadcrumbItem[] = [{ title: 'Guru', href: '/guru' }];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <div className="space-y-6 p-6">
                <h1 className="text-2xl font-semibold">Data guru</h1>

                <form
                    onSubmit={submit}
                    className="grid max-w-4xl grid-cols-5 gap-2"
                >
                    <Input
                        placeholder="Nama guru"
                        value={data.nama_guru}
                        onChange={(e) => setData('nama_guru', e.target.value)}
                    />
                    <Input
                        placeholder="Mengajar"
                        value={data.Mengajar}
                        onChange={(e) => setData('Mengajar', e.target.value)}
                    />
                    <select
                        className="rounded-xl border bg-black px-2"
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
                <div className="relative flex-1 overflow-x-auto rounded-xl border border-sidebar-border/70 p-4">
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="border-b">
                                <th className="p-2 text-left">No</th>
                                <th className="p-2 text-left">Nama</th>
                                <th className="p-2 text-left">Mengajar</th>
                                <th className="p-2 text-left">Kelas</th>
                                <th className="p-2 text-left">Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Object.values(guruPerKelas).map((group, index) => (
                                <>
                                    <tr
                                        key={`kelas-${group[0].kelas.id}`}
                                        className="bg-slate-900 font-semibold"
                                    >
                                        <td colSpan={5} className="p-3">
                                            Kelas: {group[0].kelas.nama_kelas}
                                        </td>
                                    </tr>
                                    {group.map((g, i) => (
                                        <tr key={g.id} className="border-b">
                                            <td className="p-2 text-left">
                                                {i + 1}
                                            </td>
                                            <td className="p-2 text-left">
                                                {g.nama_guru}
                                            </td>
                                            <td className="p-2 text-left">
                                                {g.Mengajar}
                                            </td>
                                            <td className="p-2 text-left">
                                                {g.kelas.nama_kelas}
                                            </td>
                                            <td className="space-x-2 p-2 text-left">
                                                <Button
                                                    size="sm"
                                                    onClick={() => edit(g)}
                                                >
                                                    Edit
                                                </Button>
                                                <Button
                                                    size="sm"
                                                    variant="destructive"
                                                    onClick={() =>
                                                        destroy(`/guru/${g.id}`)
                                                    }
                                                >
                                                    Hapus
                                                </Button>
                                            </td>
                                        </tr>
                                    ))}
                                </>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </AppLayout>
    );
}
