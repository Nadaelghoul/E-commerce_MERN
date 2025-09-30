import productModel from "../models/productModel";

export const getAllProducts = async () => {
    return await productModel.find();
};

export const seedInitialProducts = async () => {
    const products = [
       {title: "Dell Laptop" , image: "https://th.bing.com/th/id/OIP.6f1SuqpxXrIJWcRPDK6UBwHaFj?w=231&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3" , price: 15000 , stock: 10},
      // {title: "product 2" , image: "image2.jpg" , price: 20 , stock: 80},
      // {title: "product 3" , image: "image3.jpg" , price: 15 , stock: 50},
      // {title: "product 4" , image: "image4.jpg" , price: 25 , stock: 70},
      // {title: "product 5" , image: "image5.jpg" , price: 5 , stock: 90},
      // {title: "product 6" , image: "image6.jpg" , price: 30 , stock: 60},
      // {title: "product 7" , image: "image7.jpg" , price: 35 , stock: 40},
      // {title: "product 8" , image: "image8.jpg" , price: 40 , stock: 30},
      // {title: "product 9" , image: "image9.jpg" , price: 45 , stock: 20},
      // {title: "product 10" , image: "image10.jpg" , price: 50 , stock: 10},
    ];

    const existingProducts = await getAllProducts();

    if(existingProducts.length === 0){
        await productModel.insertMany(products)
    }
};