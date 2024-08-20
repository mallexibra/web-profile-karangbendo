import { Shop } from "./Shop";

export interface User {
    id: number;
    name: string;
    email: string;
    phone: string;
    role: 'village_head' | 'employee' | 'admin' | 'umkm';
    password: string;
    verified?: Date;
    position?: 'village_head' | 'employee';
    Shop: Shop[];
}
