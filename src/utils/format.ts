export const formatRupiah = (amount: number) => {
    return `Rp. ${amount.toLocaleString('id-ID')}`;
}

export const formatText = (text: string) => {
    return text.split('_').map((word: string) => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}