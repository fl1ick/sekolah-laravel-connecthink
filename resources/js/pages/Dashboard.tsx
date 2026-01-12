import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, usePage } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
];

export default function Dashboard() {
    const { kelas } = usePage().props as any;
    const { totalSiswa, totalGuru, totalKelas } = usePage().props as any;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />

            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="grid grid-cols-3 gap-4">
                    <div className="rounded-xl border p-4">
                        <h3 className="text-sm">Total Siswa</h3>
                        <p className="text-2xl font-bold">{totalSiswa}</p>
                    </div>

                    <div className="rounded-xl border p-4">
                        <h3 className="text-sm">Total Guru</h3>
                        <p className="text-2xl font-bold">{totalGuru}</p>
                    </div>

                    <div className="rounded-xl border p-4">
                        <h3 className="text-sm">Total Kelas</h3>
                        <p className="text-2xl font-bold">{totalKelas}</p>
                    </div>
                </div>

                <div className="relative flex-1 rounded-xl border border-sidebar-border/70 p-4">
                    <div className="">
                        <h1 className="mb-4 text-2xl font-semibold">
                            Daftar Siswa per Kelas
                        </h1>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse overflow-x-auto">
                            <thead>
                                <tr className="border-b">
                                    <th className="p-2 text-left">No</th>
                                    <th className="p-2 text-left">Kelas</th>
                                    <th className="p-2 text-left">Siswa</th>
                                </tr>
                            </thead>
                            <tbody>
                                {kelas.map((item: any, index: number) => (
                                    <tr key={item.id} className="border-b">
                                        <td className="p-2">{index + 1}</td>
                                        <td className="p-2 font-medium">
                                            {item.nama_kelas}
                                        </td>
                                        <td className="p-2">
                                            {item.siswa.length > 0
                                                ? item.siswa.map((s: any) => (
                                                      <div key={s.id}>
                                                          {s.nama_siswa}
                                                      </div>
                                                  ))
                                                : '-'}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="relative flex-1 rounded-xl border border-sidebar-border/70 p-4">
                    <h1>Daftar Guru per Kelas</h1>
                    <table className="h-full w-full border-collapse">
                        <thead>
                            <tr className="border-b">
                                <th className="p-2 text-left">No</th>
                                <th className="p-2 text-left">Kelas</th>
                                <th className="p-2 text-left">Guru</th>
                            </tr>
                        </thead>
                        <tbody>
                            {kelas.map((item: any, index: number) => (
                                <tr key={item.id} className="border-b">
                                    <td className="p-2">{index + 1}</td>
                                    <td className="p-2 font-medium">
                                        {item.nama_kelas}
                                    </td>
                                    <td className="p-2">
                                        {item.guru.length > 0
                                            ? item.guru.map((g: any) => (
                                                  <div key={g.id}>
                                                      {g.nama_guru} (
                                                      {g.mengajar})
                                                  </div>
                                              ))
                                            : '-'}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="relative flex-1 rounded-xl border border-sidebar-border/70 p-4">
                    <div>
                        <h1>Daftar Siswa & Guru per Kelas</h1>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse">
                            <thead>
                                <tr className="border-b">
                                    <th className="p-2 text-left">No</th>
                                    <th className="p-2 text-left">Kelas</th>
                                    <th className="p-2 text-left">Guru</th>
                                    <th className="p-2 text-left">Siswa</th>
                                </tr>
                            </thead>
                            <tbody>
                                {kelas.map((item: any, index: number) => (
                                    <tr key={item.id} className="border-b">
                                        <td className="p-2">{index + 1}</td>
                                        <td className="p-2 font-medium">
                                            {item.nama_kelas}
                                        </td>
                                        <td className="p-2">
                                            {item.guru.length > 0
                                                ? item.guru.map((g: any) => (
                                                      <div key={g.id}>
                                                          {g.nama_guru} (
                                                          {g.mengajar})
                                                      </div>
                                                  ))
                                                : '-'}
                                        </td>
                                        <td className="p-2">
                                            {item.siswa.length > 0
                                                ? item.siswa.map((s: any) => (
                                                      <div key={s.id}>
                                                          {s.nama_siswa}
                                                      </div>
                                                  ))
                                                : '-'}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
