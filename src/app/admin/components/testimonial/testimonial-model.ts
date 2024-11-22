export class TestimonialModel {
    id: number = 0;
    name: string = '';
    position: string = '';
    imageUrl: string = '';
    testimonialText: string = '';
}

export class Testimonial {
    items: TestimonialModel[] = [];
}
