import Card from '@/components/cards/Card';
import { IconEdit, IconPlus, IconTrash } from '@tabler/icons-react';

export default function AparaturDesa() {
  return (
    <Card>
      <div className="flex justify-between items-center mb-3">
        <p className="font-bold">Aparatur Desa</p>
        <button
          type="button"
          className="w-max px-3 py-2 bg-primary rounded-md cursor-pointer text-white text-sm font-medium gap-2 flex justify-center items-center"
        >
          <IconPlus color="#fff" size={18} />
          <p>Tambah Data</p>
        </button>
      </div>
      <div>
        <div className="border border-custom flex gap-3 items-center w-max p-2 rounded-md">
          <img
            src="https://images.unsplash.com/photo-1464746133101-a2c3f88e0dd9?q=80&w=2043&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            className="w-12 h-12 rounded-md bg-cover"
            alt="Profile Aparatur Desa"
          />
          <div className="text-sm mr-3">
            <p className="font-semibold">Ahmad Sulaiman</p>
            <p>Kepala Desa</p>
          </div>
          <IconEdit className="text-warning cursor-pointer" />
          <IconTrash className="text-danger cursor-pointer" />
        </div>
      </div>
    </Card>
  );
}
