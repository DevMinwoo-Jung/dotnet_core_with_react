import { Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import axios from "axios";
import { Product } from "../../app/models/product";
import Loading from "../../app/components/LoadingSpinner";

export default function ProductDetail(){
    
    const { id } = useParams()
    const [product, setProduct] = useState<Product | null>();
    const [loading, setLoading] = useState(true);

    useEffect(()=> {
        axios.get(`http://localhost:5252/api/products/${id}`).then((response)=> {
            // if(response.status === 200) {
            //     setLoading(false);
            //     setProduct(response.data)
            // }
            // 이렇게 한꺼번에 처리하지 말고
            setProduct(response.data);
        }).catch(err => console.error(err))
        .finally(() => setLoading(false))
        
    }, [id])

    if (loading) return <Loading/>

    if (!product) return <h3>Not Found</h3>

    const { brand, description, name, pictureUrl, price, quantityInStock, type } = product;
    return (
        <>

            <Typography variant="h2">
                {brand}
                {description}
                {name}
                {pictureUrl}
                {quantityInStock}
                {type}
                {price}
            </Typography>
        
        </>
    )
}