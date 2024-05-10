import { Auditory } from "./AuditoryModel";
import { Due } from "./DuesModel";

export interface Movement extends Auditory{
    key: string;
    description: string;
    amount: number;
    typeKey: string;
    categoryKey: string;
    month: number;
    year: number;
    dueKey: string;
    createdDate: string;
    modifiedDate: string;
    createdBy: string;
    dueBool: boolean;
    due?: Due;
}