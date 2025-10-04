import  Container  from "@mui/material/Container";
import ProductCard from "../components/ProductCard";
import { useEffect, useState } from "react";
import type { Product } from "../types/Product";
import { Box } from "@mui/material";
import { BASE_URL } from "../constats/baseUrl";

const HomePage = () => {
   const [products, setProducts] = useState<Product[]>([]);

   useEffect(() => {
    const fetchData = async () => {
         const response = await fetch(`${BASE_URL}/product/`);
          const data = await  response.json();
          setProducts(data);
        };
      fetchData();
   },[]);

    return (
       <Container sx={{ mt: 2 }}>
        <Box display="grid"  gridTemplateColumns="repeat(3, 1fr)"  gap={2} >
        {products.map((p)=> (
           <ProductCard   id= {p._id} title= {p.title}  price={p.price}  image={p.image}/>
        ))}
      </Box>
    </Container>
    );
};

export default HomePage;