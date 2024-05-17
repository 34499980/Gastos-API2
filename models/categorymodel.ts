import { Auditory } from "./auditorymodel";

export interface Category extends Auditory {
    key: string;
    name: string;
    image: string;
    imageKey?: string;
}