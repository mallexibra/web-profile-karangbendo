import Card from '@/components/cards/Card';
import { IconEye, IconEyeOff, IconPlus } from '@tabler/icons-react';

export default function AddUMKM() {
  return (
    <div className="space-y-3">
      <Card>
        <div className="flex justify-between items-center">
          <p className="font-bold">UMKM Desa</p>
          <button
            type="button"
            className="w-max px-3 py-2 bg-primary rounded-md text-white text-sm font-medium gap-2 flex justify-center items-center"
          >
            <IconPlus color="#fff" size={18} />
            <p>Tambah UMKM</p>
          </button>
        </div>
      </Card>
      <Card>
        <div className="flex justify-between items-center mb-3">
          <p className="font-bold">Karangbendo Kreatif</p>
          <button
            type="button"
            className="w-max px-3 py-2 bg-danger rounded-md text-white text-sm font-medium gap-2 flex justify-center items-center"
          >
            <IconEyeOff color="#fff" size={18} />
            {/* <IconEye color="#fff" size={18} /> */}
            <p>Non-aktif</p>
          </button>
        </div>
        <div>
          <div className="relative border border-custom bg-white rounded-md max-w-80 p-3">
            <img
              src="https://images.unsplash.com/photo-1453614512568-c4024d13c247?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              className="w-full rounded-md bg-cover max-h-[512px]"
              alt="Produk UMKM"
            />
          </div>
        </div>
      </Card>
    </div>
  );
}
