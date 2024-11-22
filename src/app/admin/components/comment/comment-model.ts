export class CommentModel {
    id: number = 0;
    productId: string = '';
    userId: string = '';
    content: string = '';
    rating: number = 0;
}

export class Comment {
    items: CommentModel[] = [];
}
