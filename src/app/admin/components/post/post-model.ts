export class PostModel {
    id: number = 0;
    title: string = '';
    subtitle: string = '';
    content: string = '';
    publishedDate : Date = new Date();
}

export class Post {
    items: PostModel[] = [];
}
