import { Product } from './Product';
import { User } from './User';

export interface Shop {
    id: number;
    name: string;
    description: string;
    identity: string;
    owner: User;
    userId: string;
    location: string;
    status: boolean;
    phone: string;
    product: Product[];
}
