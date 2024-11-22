export class ContactModel {
    id: number = 0;
    name: string = '';
    icon: string = '';
    contactText: string = '';
}

export class Contact {
    items: ContactModel[] = [];
}
