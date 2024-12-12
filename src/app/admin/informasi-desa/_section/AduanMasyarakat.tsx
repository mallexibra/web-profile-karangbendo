'use client';
import Button from '@/components/button/Button';
import Card from '@/components/cards/Card';
import { PublicComplaints } from '@/types/PublicComplaints';
import axiosInstance from '@/utils/axiosInstance';
import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function AduanMasyarakat() {
  const [complaints, setComplaints] = useState<PublicComplaints[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [item, setItem] = useState<PublicComplaints>({
    id: 0,
    name: '',
    complaint: '',
    emailOrPhone: '',
    supportingEvidence: '',
    description: ''
  });

  const fetchData = async () => {
    try {
      const response = await axiosInstance.get('/public-complaints');
      const dataTemporary: PublicComplaints[] = response.data.data;

      setComplaints(dataTemporary);
    } catch (error) {
      console.error(`Error fetching data public complaints:`, error);
    }
  };

  const modalClick = () => {
    const modal = document.getElementById('modal') as HTMLDialogElement;
    if (modal) {
      modal.showModal();
    }
  };

  const close = () => {
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
    <Card>
      <dialog id="modal" className="modal">
        <div className="modal-box">
          <button
            type="button"
            onClick={close}
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          >
            ✕
          </button>

          <h3 className="font-bold text-lg">Detail Aduan Masyarakat</h3>

          <div className="mt-5 space-y-3">
            {item.supportingEvidence && (
              <Image
                src={item.supportingEvidence}
                width={500}
                height={200}
                className="w-full rounded-md object-cover"
                alt="Bukti Aduan Masyarakat"
              />
            )}
            <div>
              <h4 className="font-semibold">Nama Masyarakat</h4>
              <p>{item.name}</p>
            </div>
            <div>
              <h4 className="font-semibold">Email/Nomor Telepon</h4>
              <p>{item.emailOrPhone}</p>
            </div>
            <div>
              <h4 className="font-semibold">Jenis Aduan</h4>
              <p>{item.complaint}</p>
            </div>
            <div>
              <h4 className="font-semibold">Deskripsi Aduan</h4>
              <p>{item.description}</p>
            </div>
          </div>
        </div>
      </dialog>

      <p className="font-bold mb-3">Aduan Masyarakat</p>
      {complaints.length === 0 ? (
        <p>Data aduan masyarakat sedang kosong!</p>
      ) : (
        <div className="overflow-x-auto rounded-md">
          <table className="table-auto w-full text-left">
            <thead className="bg-primary text-white">
              <tr>
                <th className="text-center p-3">NO</th>
                <th>NAMA</th>
                <th>JENIS ADUAN</th>
                <th>AKSI</th>
              </tr>
            </thead>
            <tbody className="bg-second font-medium">
              {complaints.map((complaint, index) => (
                <tr key={complaint.id || index}>
                  <td className="text-center p-3">{index + 1}</td>
                  <td>{complaint.name}</td>
                  <td>{complaint.complaint}</td>
                  <td className="space-x-2">
                    <Button
                      size="sm"
                      onClick={() => {
                        setItem(complaint);
                        modalClick();
                      }}
                    >
                      Lihat Detail
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Card>
  );
}
