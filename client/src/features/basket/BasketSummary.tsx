import { TableContainer, Paper, Table, TableBody, TableRow, TableCell } from "@mui/material";
import { useStoreContext } from "../../app/context/StoreContext";

export default function BasketSummary() {
  const {basket} = useStoreContext();
  
  const subtotal:number =  Number(basket?.items.reduce((sum, item) => sum + item.price, 0));

  //   const itemCount =itemCount = basket?.items.reduce((sum, item) => sum + item.quantity, 0
  
  const deliveryFee = subtotal < 9999 ? 3000 : 0;


    return (
        <>
            <TableContainer component={Paper} variant={'outlined'}>
                <Table>
                    <TableBody>
                        <TableRow>
                            <TableCell colSpan={2}>Subtotal</TableCell>
                            <TableCell align="right">{subtotal}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell colSpan={2}>Delivery fee*</TableCell>
                            <TableCell align="right">{deliveryFee}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell colSpan={2}>Total</TableCell>
                            <TableCell align="right">{subtotal + deliveryFee}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                <span style={{fontStyle: 'italic'}}>*Orders over 100000 qualify for free delivery</span>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}