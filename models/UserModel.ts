import { Auditory } from "./auditorymodel";

export interface User extends Auditory {
    key: string;
    name: string;
    mail: string;    
    password: string;

}