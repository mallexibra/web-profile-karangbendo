import React from 'react';
import BgHeader from '../../../../assets/bgheader.png';
import ContainerClient from '@/components/containers/ContainerClient';

export default function HeaderTransparancy() {
    return (
        <div id="header" className='relative h-64' style={{
            backgroundImage: `url(${BgHeader.src})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
        }}>
            <div id='pendanaan' className='p-6 rounded-t-2xl w-full bg-white absolute bottom-0'>
                <div className='bg-primary rounded-tl-2xl w-max p-3'>
                    <p className='font-bold text-lg text-white uppercase'>Transparansi</p>
                </div>
            </div>
        </div>
    )
}
