'use client';
import Button from '@/components/button/Button';
import Card from '@/components/cards/Card';
import { User } from '@/types/User';
import axiosInstance from '@/utils/axiosInstance';
import { IconPlus } from '@tabler/icons-react';
import { useEffect, useState } from 'react';

export default function TableSection() {
  const [accounts, setAccounts] = useState<User[]>([]);

  const fetchData = async () => {
    try {
      const response = await axiosInstance.get('/users');

      setAccounts(response.data.data);
    } catch (error) {
      console.log(`Error fetching data: ${error}`);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <Card>
      <div className="flex justify-between items-center mb-3">
        <p className="font-bold">Daftar Akun Admin</p>
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
              <th>NAMA</th>
              <th>EMAIL</th>
              <th>JABATAN</th>
              <th>AKSI</th>
            </tr>
          </thead>
          <tbody className="bg-second font-medium">
            {accounts.length > 0 ? (
              accounts.map((account: User, i: number) => (
                <tr>
                  <td className="text-center p-3">{i + 1}</td>
                  <td>{account.name}</td>
                  <td>{account.email}</td>
                  <td>{account.position}</td>
                  <td className="space-x-2">
                    <Button color="warning" size="sm">
                      Edit
                    </Button>
                    <Button color="danger" size="sm">
                      Delete
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="text-center font-medium py-3">
                  Data sedang kosong...
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
