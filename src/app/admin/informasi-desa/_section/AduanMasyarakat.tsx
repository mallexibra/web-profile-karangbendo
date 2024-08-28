'use client';
import Button from '@/components/button/Button';
import Card from '@/components/cards/Card';
import { PublicComplaints } from '@/types/PublicComplaints';
import axiosInstance from '@/utils/axiosInstance';
import { useEffect, useState } from 'react';

export default function AduanMasyarakat() {
  const [complaints, setComplaints] = useState<PublicComplaints[]>([]);

  const fetchData = async () => {
    try {
      const response = await axiosInstance.get('/public-complaints');
      const dataTemporary: PublicComplaints[] = response.data.data;
      // const data = dataTemporary.filter((user: User) => user.role == 'admin');

      setComplaints(dataTemporary);
    } catch (error) {
      console.log(`Error fetching data public complaints: ${error}`);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <Card>
      <p className="font-bold mb-3">Aduan Masyarakat</p>
      {complaints.length <= 0 ? (
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
              {complaints.map((complaint: PublicComplaints, i: number) => (
                <tr key={i}>
                  <td className="text-center p-3">{i + 1}</td>
                  <td>{complaint.name}</td>
                  <td>{complaint.complaint}</td>
                  <td className="space-x-2">
                    <Button size="sm">Lihat Detail</Button>
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
