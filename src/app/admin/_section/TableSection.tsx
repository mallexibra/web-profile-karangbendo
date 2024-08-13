import Card from '@/components/cards/Card';
import { IconPlus } from '@tabler/icons-react';

export default function TableSection() {
  return (
    <Card>
      <div className="flex justify-between items-center mb-3">
        <p className="font-bold">Daftar Akun Admin</p>
        <div className="w-max px-3 py-2 bg-primary rounded-md text-white text-sm font-medium gap-2 flex justify-center items-center">
          <IconPlus color="#fff" size={18} />
          <p>Tambah Data</p>
        </div>
      </div>
      <p>Table</p>
    </Card>
  );
}
