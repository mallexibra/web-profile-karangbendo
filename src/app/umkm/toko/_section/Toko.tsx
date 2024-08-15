import Button from '@/components/button/Button';
import Card from '@/components/cards/Card';
import { formatRupiah } from '@/utils/format';
import { IconPlus, IconCircleXFilled } from '@tabler/icons-react';

export default function Toko() {
  return (
    <Card>
      <div className="flex justify-between items-center mb-3">
        <p className="font-bold">Karangbendo Kreatif</p>
        <button
          type="button"
          className="w-max px-3 py-2 bg-primary rounded-md cursor-pointer text-white text-sm font-medium gap-2 flex justify-center items-center"
        >
          <IconPlus color="#fff" size={18} />
          <p>Tambah Produk</p>
        </button>
      </div>
      <div className="flex gap-3 flex-wrap">
        <div className="relative border border-custom bg-white rounded-md max-w-80 p-3">
          <img
            src="https://images.unsplash.com/photo-1453614512568-c4024d13c247?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            className="w-full rounded-md bg-cover max-h-[512px]"
            alt="Produk UMKM"
          />
          <span className="inline-block absolute -top-2 -right-2 cursor-pointer bg-white w-max rounded-full">
            <IconCircleXFilled className="text-rose-600" />
          </span>
          <p className="font-bold mt-3 text-lg">Kopi Robusta</p>
          <p className="font-semibold my-1 text-danger">
            {formatRupiah(120000)}
          </p>
          <p className="text-xs font-semibold">Deskripsi</p>
          <p className="text-xs">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Mollitia
            animi officiis illum, consequatur id ipsam minus ratione ut
            exercitationem voluptate.
          </p>
          <div className="flex gap-3 mt-3">
            <Button color="warning" size="sm" className="w-full">
              Edit
            </Button>
            <Button color="danger" size="sm" className="w-full">
              Delete
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}
