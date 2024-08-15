import Button from '@/components/button/Button';
import Card from '@/components/cards/Card';
import { IconPlus } from '@tabler/icons-react';

export default function KegiatanMasyarakat() {
  return (
    <Card>
      <div className="flex justify-between items-center mb-3">
        <p className="font-bold">Kegiatan Masyarakat</p>
        <button
          type="button"
          className="w-max px-3 py-2 bg-primary rounded-md cursor-pointer text-white text-sm font-medium gap-2 flex justify-center items-center"
        >
          <IconPlus color="#fff" size={18} />
          <p>Tambah Data</p>
        </button>
      </div>
      <div>
        <div className="border border-custom w-max rounded-t-md">
          <img
            src="https://images.unsplash.com/photo-1531834685032-c34bf0d84c77?q=80&w=1997&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            width={252}
            height={20}
            className="bg-cover w-full h-32"
            alt="Communal Work Image"
          />
          <div className="max-w-[280px] space-y-2 p-3">
            <p className="font-semibold text-primary">Gotong Royong Warga</p>
            <p className="text-xs font-medium opacity-35">12 Juli 2024</p>
            <p className="text-sm">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptas
              atque dolorum velit earum, nobis in consequatur?
            </p>
            <div className="flex gap-3">
              <Button color="warning" size="sm" className="w-full">
                Edit
              </Button>
              <Button color="danger" size="sm" className="w-full">
                Delete
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
