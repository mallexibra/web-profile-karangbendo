'use client';
import ContainerClient from '@/components/containers/ContainerClient';
import { CommunityActivities } from '@/types/CommunityActivities';
import axiosInstance from '@/utils/axiosInstance';
import { formatDate } from '@/utils/format';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function CommunityActivity() {
  const [data, setData] = useState<CommunityActivities[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [item, setItem] = useState<CommunityActivities>({
    id: 0,
    name: '',
    description: '',
    image: '',
    time: new Date(),
  });

  const fetchData = async () => {
    try {
      const response = await axiosInstance.get('/community-activities');
      setData(response.data.data);
    } catch (error: any) {
      console.log(`Error fetch data: ${error}`);
    }
  };

  const modalClick = () => {
    const modal = document.getElementById('modal') as HTMLDialogElement;
    if (modal) {
      modal.showModal();
    }
  };

  const close: any = () => {
    const modal = document.getElementById('modal') as HTMLDialogElement;
    if (modal) {
      modal.close();
      setIsModalOpen(false);
    }
  };

  useEffect(() => {
    if (isModalOpen) modalClick();
  }, [isModalOpen]);

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div id="kegiatanmasyarakat">
      <dialog id="modal" className="modal">
        <div className="modal-box">
          <button
            type="button"
            onClick={close}
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          >
            ✕
          </button>

          <h3 className="font-bold text-lg">Detail Kegiatan Masyarakat</h3>

          <div className="mt-5 space-y-3">
            <Image
              src={item.image}
              width={500}
              height={200}
              className="w-full rounded-md object-cover"
              alt={item.name}
            />
            <div>
              <h4 className="font-semibold">Nama Kegiatan</h4>
              <p>{item.name}</p>
            </div>
            <div>
              <h4 className="font-semibold">Waktu Kegiatan</h4>
              <p>{formatDate(item.time)}</p>
            </div>
            <div>
              <h4 className="font-semibold">Deskripsi Kegiatan</h4>
              <p>{item.description}</p>
            </div>
          </div>
        </div>
      </dialog>
      <ContainerClient classNames="md:pt-24 pt-12">
        <h1 className="title" data-aos="fade-down">
          Kegiatan Masyarakat
        </h1>
        <p data-aos="fade-down">
          Kegiatan rutin masyarakat meliputi arisan, gotong royong membersihkan
          lingkungan, kegiatan keagamaan, dan festival budaya tahunan.
        </p>
        <div
          className="mt-5 flex flex-col md:flex-row justify-center md:justify-start items-center md:items-start gap-2"
          data-aos="fade-down"
        >
          {data.length <= 0 ? (
            <p>Data kegiatan masyarakat sedang kosong!</p>
          ) : (
            data.map((item: CommunityActivities, i: number) => (
              <div
                key={i}
                onClick={() => {
                  modalClick();
                  setItem(item);
                }}
                className="max-w-72 rounded-md overflow-hidden cursor-pointer border border-custom"
              >
                <Image
                  src={item.image}
                  width={500}
                  height={200}
                  className="w-full object-cover"
                  alt={item.name}
                />
                <div className="p-3">
                  <p className="font-bold text-primary">{item.name}</p>
                  <p className="font-medium text-xs opacity-50 my-1">
                    {formatDate(item.time)}
                  </p>
                  <p className="text-sm truncate">{item.description}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </ContainerClient>
    </div>
  );
}
