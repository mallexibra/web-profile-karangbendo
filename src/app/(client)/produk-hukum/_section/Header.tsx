import React from 'react';
import BgHeader from '../../../../assets/bgheader.png';
import ContainerClient from '@/components/containers/ContainerClient';

export default function HeaderProdukHukum() {
    return (
        <div id="header" className='relative h-64' style={{
            backgroundImage: `url(${BgHeader.src})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
        }}>
            <div id='peraturandesa' className='md:px-6 px-0 py-6 rounded-t-2xl w-full bg-white absolute bottom-0'>
                <ContainerClient>
                    <div data-aos="fade-down" className='bg-primary rounded-tl-2xl w-max p-3'>
                        <p className='font-bold text-lg text-white uppercase'>Produk Hukum</p>
                    </div>
                </ContainerClient>
            </div>
        </div>
    )
}
