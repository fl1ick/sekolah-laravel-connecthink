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

interface Siswa {
    id: number;
    nama_siswa: string;
    alamat: string;
    tanggal_lahir: string;
    kelas_id: number;
    kelas: Kelas;
}

export default function Index({
    siswa = [],
    kelas = [],
}: {
    siswa: Siswa[];
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
        nama_siswa: '',
        alamat: '',
        tanggal_lahir: '',
        kelas_id: '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();

        if (editId) {
            put(`/siswa/${editId}`, {
                onSuccess: () => {
                    reset();
                    setEditId(null);
                },
            });
        } else {
            post('/siswa', {
                onSuccess: () => reset(),
            });
        }
    };

    const edit = (item: Siswa) => {
        setEditId(item.id);
        setData('nama_siswa', item.nama_siswa);
        setData('alamat', item.alamat);
        setData('tanggal_lahir', item.tanggal_lahir);
        setData('kelas_id', String(item.kelas_id));
    };

    const siswaPerKelas = siswa.reduce((acc: Record<number, Siswa[]>, item) => {
        if (!item.kelas) return acc;

        if (!acc[item.kelas.id]) {
            acc[item.kelas.id] = [];
        }

        acc[item.kelas.id].push(item);
        return acc;
    }, {});

    const breadcrumbs: BreadcrumbItem[] = [{ title: 'Siswa', href: '/siswa' }];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <div className="space-y-6 p-6">
                <h1 className="text-2xl font-semibold">Data Siswa</h1>

                <form
                    onSubmit={submit}
                    className="grid max-w-4xl grid-cols-5 gap-2"
                >
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
                                <th className="p-2 text-left">Alamat</th>
                                <th className="p-2 text-left">Tgl Lahir</th>
                                <th className="p-2 text-left">Kelas</th>
                                <th className="p-2 text-left">Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Object.values(siswaPerKelas).map(
                                (group, index) => (
                                    <>
                                        <tr
                                            key={`kelas-${group[0].kelas.id}`}
                                            className="bg-slate-900 font-semibold"
                                        >
                                            <td colSpan={6} className="p-3">
                                                Kelas:{' '}
                                                {group[0].kelas.nama_kelas}
                                            </td>
                                        </tr>
                                        {group.map((s, i) => (
                                            <tr key={s.id} className="border-b">
                                                <td className="p-2">{i + 1}</td>
                                                <td className="p-2">
                                                    {s.nama_siswa}
                                                </td>
                                                <td className="p-2">
                                                    {s.alamat}
                                                </td>
                                                <td className="p-2">
                                                    {s.tanggal_lahir.slice(
                                                        0,
                                                        10,
                                                    )}
                                                </td>
                                                <td className="p-2">
                                                    {s.kelas.nama_kelas}
                                                </td>
                                                <td className="space-x-2 p-2">
                                                    <Button
                                                        size="sm"
                                                        onClick={() => edit(s)}
                                                    >
                                                        Edit
                                                    </Button>
                                                    <Button
                                                        size="sm"
                                                        variant="destructive"
                                                        onClick={() =>
                                                            destroy(
                                                                `/siswa/${s.id}`,
                                                            )
                                                        }
                                                    >
                                                        Hapus
                                                    </Button>
                                                </td>
                                            </tr>
                                        ))}
                                    </>
                                ),
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </AppLayout>
    );
}
