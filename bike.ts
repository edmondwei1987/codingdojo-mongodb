class Bike{
    price: number;
    max_speed: string;
    miles: number;
    constructor(price,max_speed){
        this.price = price;
        this.max_speed = max_speed;
        this.miles = 0;
    }
    displayInfo() {
        console.log(this.price, this.max_speed, this.miles);
        return this;
    }
    ride() {
        console.log("Riding");
        this.miles += 10;
        return this
    }
    reserve() {
        console.log("Reserving");
        this.miles -= 5;
        return this;
    }

}

let bike1 = new Bike(200, '12mph');
let bike2 = new Bike(300, '20mph');
let bike3 = new Bike(400, '25mph');
bike1.ride().ride().ride().reserve().displayInfo();
bike2.ride().ride().reserve().reserve().displayInfo();
bike3.reserve().reserve().reserve().displayInfo();
