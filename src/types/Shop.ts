import { Product } from './Product';
import { User } from './User';

export interface Shop {
    id: number;
    name: string;
    description: string;
    identity: string;
    owner: User;
    userId: number;
    location: string;
    phone: string;
    Product?: Product[];
}
