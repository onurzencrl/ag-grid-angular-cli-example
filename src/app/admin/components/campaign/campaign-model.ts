export class CampaignModel {
    id: number = 0;
    name: string = '';
    text: string = '';
    title: string = '';
    discount: number = 0;
}

export class Campaign {
    items: CampaignModel[] = [];
}
