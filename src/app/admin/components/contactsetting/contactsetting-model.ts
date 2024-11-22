export class ContactsettingModel {
    id: number = 0;
    name: string = '';
    sendSms: boolean =false;
    sendEmail: boolean = false;
    userId: string = '';
    calling: boolean = false;
}

export class Contactsetting {
    items: ContactsettingModel[] = [];
}
