export class Restaurant {
    
    constructor(
        public uid: number,
        public banner: string,
        public name: string,
        public short_name: string,
        public cuisine: string[],
        public time: string,
        public rating: string,
        public price:string,
        public distance?:  number,
        public address?: string
    ) {}

}