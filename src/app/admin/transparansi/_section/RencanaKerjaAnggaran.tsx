import Button from '@/components/button/Button';
import Card from '@/components/cards/Card';
import { formatRupiah } from '@/utils/format';
import { IconPlus } from '@tabler/icons-react';

export default function RencanaKerjaAnggaran() {
  return (
    <Card>
      <div className="flex justify-between items-center mb-3">
        <p className="font-bold">Rencana Kerja dan Anggaran</p>
        <button
          type="button"
          className="w-max px-3 py-2 bg-primary rounded-md text-white text-sm font-medium gap-2 flex justify-center items-center"
        >
          <IconPlus color="#fff" size={18} />
          <p>Tambah Data</p>
        </button>
      </div>
      <div className="overflow-x-auto rounded-md">
        <table className="table-auto w-full text-left">
          <thead className="bg-primary text-white">
            <tr>
              <th className="text-center p-3">NO</th>
              <th>NAMA ANGGARAN</th>
              <th>ANGGARAN</th>
              <th>AKSI</th>
            </tr>
          </thead>
          <tbody className="bg-second font-medium">
            <tr>
              <td className="text-center p-3">1</td>
              <td>Pendidikan Masyarakat</td>
              <td>{formatRupiah(1200000)}</td>
              <td className="space-x-2">
                <Button size="sm">Lihat Detail</Button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </Card>
  );
}
