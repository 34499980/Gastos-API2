import { Auditory } from "./AuditoryModel";

export interface User extends Auditory {
    key: string;
    name: string;
    mail: string;    
    password: string;

}