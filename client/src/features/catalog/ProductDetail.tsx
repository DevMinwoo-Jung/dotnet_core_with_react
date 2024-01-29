import { Divider, Grid, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from "@mui/material";
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
            <Grid container spacing={6}>
                <Grid item xs={6}>
                    <img src={pictureUrl} alt={product.name} style={{width: '100%'}}></img>
                </Grid>
                <Grid item xs={6}>
                    <Typography variant="h3">{name}</Typography>
                    <Divider sx={{mb: 2}}/>
                    <Typography variant="h4" color='secondary'>{(price /100).toFixed(2)}</Typography>
                    <TableContainer>
                        <Table>
                            <TableBody>
                                <TableRow>
                                    <TableCell>Name</TableCell>
                                    <TableCell>{name}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Description</TableCell>
                                    <TableCell>{description}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Type</TableCell>
                                    <TableCell>{type}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Brand</TableCell>
                                    <TableCell>{brand}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Quantity in stock</TableCell>
                                    <TableCell>{quantityInStock}</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </Grid>
        </>
    )
}