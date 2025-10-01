import { cartModel } from "../models/cartModel";
import productModel from "../models/productModel";

interface CreateCartForUser{
    userId: string;
}


const createCartForUser = async ({userId}: CreateCartForUser) => { // to create cart for new user for the first time
     const cart = await cartModel.create({userId , totalAmount: 0})
     await cart.save();
     return cart;
}


interface GetActiveCartForUser {
    userId: string;
}

export const getActiveCartForUser = async ({userId}: GetActiveCartForUser) => {
     let cart = await cartModel.findOne({userId, status : "active"});
     if(!cart){
        cart = await createCartForUser({userId});
     }

     return cart;
};

interface AddItemToCart {
    productId : any;
    quantity : number;
    userId : string;
}

export const addItemToCart = async ({productId , quantity , userId}: AddItemToCart) => {

      const cart = await  getActiveCartForUser({userId});
      const existsInCart = cart.items.find((p) => p.product.toString() === productId); // product in cart is object_id
      if(existsInCart){
        return{data : "Item already exists in Cart!" , statusCode : 400};
      }
      const product = await productModel.findById(productId);

      if(!product){
        return{data : "Product not Found!" , statusCode : 400}; 
      }
      
      if(product.stock < quantity){
         return{data : "Low stock for item" , statusCode : 400}; 
      }

      cart.items.push({product: productId, unitPrice: product.price , quantity });

      // update the totalAmount of the cart
      cart.totalAmount += product.price * quantity;

      const updatedCart = await cart.save();

      return { data : updatedCart , statusCode : 200};

}

interface UpdateItemInCart {
    productId : any;
    quantity : number;
    userId : string;
}

export const updateItemInCart = async ({productId , quantity , userId}: UpdateItemInCart) => {
       const cart = await  getActiveCartForUser({userId});

      const existsInCart = cart.items.find((p) => p.product.toString() === productId); // product in cart is object_id
      if(!existsInCart){
        return{data : "Item does not  exists in Cart!" , statusCode : 400};
      }

      const product = await productModel.findById(productId);

      if(!product){
        return{data : "Product not Found!" , statusCode : 400}; 
      }
      
      if(product.stock < quantity){
         return{data : "Low stock for item" , statusCode : 400}; 
      }

      const otherCartItems = cart.items.filter((p) => p.product.toString() !== productId);

      let total = otherCartItems.reduce((sum, product) => {
           sum+= product.quantity * product.unitPrice;
           return sum;
      }, 0)

      existsInCart.quantity = quantity;
      total+= existsInCart.quantity * existsInCart.unitPrice;
      cart.totalAmount = total;

      const updatedCart = await cart.save();

      return {data : updatedCart , statusCode : 200};
}