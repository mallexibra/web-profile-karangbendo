import Card from '@/components/cards/Card';
import { formatRupiah } from '@/utils/format';
import { IconPlus } from '@tabler/icons-react';

export default function KeuanganDesa() {
  return (
    <Card>
      <div className="flex justify-between items-center mb-3">
        <p className="font-bold">Keuangan Pemerintah Desa</p>
        <button
          type="button"
          className="w-max px-3 py-2 bg-primary rounded-md cursor-pointer text-white text-sm font-medium gap-2 flex justify-center items-center"
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
              <th>JENIS</th>
              <th>JUMLAH</th>
            </tr>
          </thead>
          <tbody className="bg-second font-medium">
            <tr>
              <td className="text-center p-3">1</td>
              <td>Dana Desa (DD)</td>
              <td>Pendapatan</td>
              <td>{formatRupiah(12000000)}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </Card>
  );
}
