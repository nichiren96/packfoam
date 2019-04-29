export class Order {

    shipping_address: string;

    constructor(public number: string, 
                public order_date: string,
                public product_quantity: number,
                public confirmed: boolean,
                public client_id: string, 
                public user_id: string,
                public product_id: string) {

        
    }
}