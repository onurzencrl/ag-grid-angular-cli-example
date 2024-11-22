export class ReviewModel {
    id: number = 0;
    commentId: string = '';
    productId: string = '';
    userId: string = '';
    averageRating: number = 0;
}

export class Review {
    items: ReviewModel[] = [];
}
