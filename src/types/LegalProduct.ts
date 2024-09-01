export interface LegalProduct {
    file: any;
    id: number;
    title: string;
    number: string;
    description: string;
    date: string;
    type?: 'village_regulation' | 'village_head_regulation' | 'village_head_decision';
}
