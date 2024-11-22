export class MenuModel {
    id!: string;
    name?: string;
    icon?: string;
    url?: string;
    order?: number;
    parentMenuId?: string;
    subMenus: MenuModel[] = [];
  }
  
    export class Menu {
        items: MenuModel[] = [];    
    }
  