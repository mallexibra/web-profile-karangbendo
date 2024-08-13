import { IconLogout } from '@tabler/icons-react';

export default function HeaderAdmin() {
  return (
    <header className="py-3 px-6 bg-white flex justify-between border-custom border-b-2">
      <h2 className="font-bold">Halo, Maulana Malik Ibrahim</h2>
      <div className="flex justify-end items-center gap-2">
        <IconLogout color="#449E85" size={24} />
        <p className="font-semibold text-primary">Logout</p>
      </div>
    </header>
  );
}
