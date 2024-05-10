import { Auditory } from "./AuditoryModel";

export interface Category extends Auditory {
    key: string;
    name: string;
    image: string;
    imageKey?: string;
}