'use client';
import Button from '@/components/button/Button';
import Card from '@/components/cards/Card';
import { Shop } from '@/types/Shop';
import { formatRupiah } from '@/utils/format';
import {
  IconCircleXFilled,
  IconEye,
  IconEyeOff,
  IconPlus,
} from '@tabler/icons-react';
import { useEffect, useState } from 'react';

export default function AddUMKM() {
  const [umkm, setUmkm] = useState<Shop[]>([]);
  const [type, setType] = useState<string>('add');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [id, setId] = useState<number | null>(null);

  const modalClick = () => {
    const modal = document.getElementById(
      `modal_${type}3`,
    ) as HTMLDialogElement;
    if (modal) {
      modal.showModal();
    }
  };

  const close: any = () => {
    const modal = document.getElementById(
      `modal_${type}4`,
    ) as HTMLDialogElement;
    if (modal) {
      modal.close();
      setIsModalOpen(false);
      setType('add');
    }
  };

  useEffect(() => {
    if (isModalOpen) modalClick();
  }, [isModalOpen]);
  return (
    <div className="space-y-3">
      <Card>
        <div className="flex justify-between items-center">
          <p className="font-bold">UMKM Desa</p>
          <button
            onClick={() => {
              setIsModalOpen(true);
            }}
            type="button"
            className="w-max px-3 py-2 bg-primary rounded-md text-white text-sm font-medium gap-2 flex justify-center items-center"
          >
            <IconPlus color="#fff" size={18} />
            <p>Tambah UMKM</p>
          </button>
        </div>
        <dialog id={`modal_${type}3`} className="modal">
        <div className="modal-box">
          <button
            type="button"
            onClick={close}
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          >
            ✕
          </button>

          <h3 className="font-bold text-lg">
            {type == 'view'
              ? 'Detail'
              : type.split('_')[0] == 'edit'
                ? 'Edit'
                : 'Tambah'}{' '}
            Peraturan Desa
          </h3>

          <form
            method="post"
            onSubmit={handleSubmit(handleAddRegulation)}
            className="mt-3 flex flex-col gap-2"
          >
            <LabelForm label="Nama Kegiatan">
              <InputForm
                disabled={type == 'view'}
                {...register('title')}
                type="text"
                label="Nama Kegiatan"
                name="title"
                placeholder="Input judul peraturan"
              />
              {errors.title && (
                <p className="text-red-500 text-sm">{errors.title.message}</p>
              )}
            </LabelForm>

            <LabelForm label="Nomor">
              <InputForm
                disabled={type == 'view'}
                {...register('number')}
                type="text"
                label="Nomor"
                name="number"
                placeholder="Input nomor peraturan"
              />
              {errors.number && (
                <p className="text-red-500 text-sm">{errors.number.message}</p>
              )}
            </LabelForm>

            <LabelForm label="Deskripsi">
              <textarea
                disabled={type == 'view'}
                {...register('description')}
                placeholder="Masukkan deskripsi peraturan"
                rows={3}
                className="block w-full px-2 py-3 border-custom border text-xs bg-second rounded-md outline-none"
              />
              {errors.description && (
                <p className="text-red-500 text-sm">
                  {errors.description.message}
                </p>
              )}
            </LabelForm>

            <LabelForm label="File">
              {selectedFile ? (
                <div className="relative bg-second w-full rounded-md p-3 border-custom border">
                  <div className="flex items-center text-sm font-medium gap-3">
                    <IconFile size={28} className="text-primary" />
                    <p>{selectedFile}</p>
                  </div>
                  <IconSquareRoundedXFilled
                    onClick={() => {
                      setSelectedFile(null);
                    }}
                    className="text-red-600 absolute -top-2 -right-2 cursor-pointer"
                  />
                </div>
              ) : (
                <InputForm
                  disabled={type == 'view'}
                  {...register('file')}
                  accept=".pdf,.doc,.docx"
                  type="file"
                  label="File"
                  name="file"
                  placeholder="Input file peraturan"
                  onChange={handleFileChange}
                />
              )}
              {errors.file && (
                <p className="text-red-500 text-sm">{errors.file.message}</p>
              )}
            </LabelForm>

            {type != 'view' && (
              <Button type="submit" color="primary" size="base">
                Save
              </Button>
            )}
          </form>
        </div>
      </dialog>
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
    </div>
  );
}
