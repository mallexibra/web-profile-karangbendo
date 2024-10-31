export const formatRupiah = (amount: number) => {
    return `Rp. ${amount.toLocaleString('id-ID')}`;
}

export const formatText = (text: string) => {
    const customMappings: { [key: string]: string } = {
        village_head: "Kepala Desa",
        employee: "Pegawai",
        admin: "Admin",
        umkm: "UMKM"
    };

    return customMappings[text];
}

export function formatDate(date: Date | string): string {
    if (typeof date === 'string') {
        date = new Date(date);
    }

    const months = [
        'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
        'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
    ];

    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();

    return `${day} ${month} ${year}`;
}
