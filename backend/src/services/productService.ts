import productModel from "../models/productModel";

export const getAllProducts = async () => {
    return await productModel.find();
};

export const seedInitialProducts = async () => {
    try{
        const products = [
       {title: "Dell Laptop" , image: "https://th.bing.com/th/id/OIP.6f1SuqpxXrIJWcRPDK6UBwHaFj?w=231&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3" , price: 15000 , stock: 10},
       {title: "Asus Laptop" , image: "https://th.bing.com/th/id/OIP.21ZjavQ-dwJSCHhEYC-RrAHaHa?o=7&cb=12rm=3&rs=1&pid=ImgDetMain&o=7&rm=3" , price: 25000 , stock: 20},
       {title: "HP Laptop" , image: "https://th.bing.com/th/id/R.f1d38d63cdaeb315d0cd91c9fce8307d?rik=77yW0%2fGz1ADu2w&pid=ImgRaw&r=0" , price: 40000 , stock: 8},
    ];

    const existingProducts = await getAllProducts();

    if(existingProducts.length === 0){
        await productModel.insertMany(products)
    }
    }catch(err){
        console.error("cannot seed database", err);
    }
    
};