export interface LegalProduct {
    id: number;
    title: string;
    number: string;
    description: string;
    type: 'village_regulation' | 'village_head_regulation' | 'village_head_decision';
}
