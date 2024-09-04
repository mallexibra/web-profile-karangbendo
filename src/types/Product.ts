import { Shop } from './Shop';

export interface Product {
    id: number;
    image: string;
    name: string;
    description: string;
    price: number;
    shop: Shop;
    shopId: number;
}