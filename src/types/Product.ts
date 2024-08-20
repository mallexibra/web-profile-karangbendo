import { Shop } from './Shop';

export interface Product {
    id: number;
    image: string;
    name: string;
    description: string;
    price: bigint;
    shop: Shop;
    shopId: number;
}