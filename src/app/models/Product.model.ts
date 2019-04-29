export class Product {

    cover_image: string;

    constructor(public reference: string, 
                public quantity: number,
                public designation: string, 
                public price: number) {

        
    }
}