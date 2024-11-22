export class FilterModel {
    id: number = 0;
    name: string = '';
    parentFilterId: string | null = null;
}

export class Filter {
    items: FilterModel[] = [];
}
