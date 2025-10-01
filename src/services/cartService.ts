import { cartModel } from "../models/cartModel";

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