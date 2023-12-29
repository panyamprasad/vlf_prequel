import {BaseModel} from './_base.model';

export class ContactHistoryModel extends BaseModel {
    applicationId: number;
    notes: string;
    type: string = 'Notes'; // type of the transaction - SMS, Email, Priority, Notes
    action: string;  // blank for notes, subscribe / UnSubscribe for emails & SMS, High,
    // Low, Medium and No for Priority
    title: string;
    source: string;
    notesDate: Date;
    followUpDate: Date;

    // used for internal purpose
    employeeId: string;
}
