import React from 'react';
import BgHeader from '../../../../assets/bgheader.png';

export default function HeaderUMKM() {
    return (
        <div id="header" className='relative h-64' style={{
            backgroundImage: `url(${BgHeader.src})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
        }}>
            <div className='p-6 rounded-t-2xl w-full bg-white absolute bottom-0'>
                <div className='bg-primary rounded-tl-2xl w-max p-3'>
                    <p className='font-bold text-lg text-white uppercase'>Produk UMKM</p>
                </div>
            </div>
        </div>
    )
}
