import Button from '@/components/button/Button';
import Card from '@/components/cards/Card';
import { IconPlus } from '@tabler/icons-react';

export default function PeraturanKepalaDesa() {
  return (
    <Card>
      <div className="flex justify-between items-center mb-3">
        <p className="font-bold">Peraturan Kepala Desa</p>
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
              <th>JUDUL PERATURAN</th>
              <th>NOMOR</th>
              <th>TANGGAL PENETAPAN</th>
              <th>DOWNLOAD</th>
            </tr>
          </thead>
          <tbody className="bg-second font-medium">
            <tr>
              <td className="text-center p-3">1</td>
              <td>Peraturan Desa tentang Pengelolaan Sampah</td>
              <td>01/2024</td>
              <td>15 Januari 2024</td>
              <td>
                <Button size="sm">Download</Button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </Card>
  );
}
