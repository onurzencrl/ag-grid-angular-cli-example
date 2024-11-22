export class ServiceModel {
    id: number = 0;
    name: string = '';
    description: string = '';
    icon: string = '';
    url: string = '';
}

export class Service {
    items: ServiceModel[] = [];
}
