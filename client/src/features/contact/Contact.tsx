import { Button, ButtonGroup, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { CounterState, decrement, increment } from "./counterReducer";

export default function Contact() {
    const dispatch = useDispatch();
    const data = useSelector((state: CounterState) => state.data);
    const title = useSelector((state: CounterState) => state.title);

    return (
        <Typography variant="h2">
            Contact Page
            {data}
            {title}
            <ButtonGroup>
                <Button onClick={()=> dispatch(decrement())} variant="contained">어려지기</Button>
                <Button onClick={()=> dispatch(increment())} variant="contained">나이먹기</Button>
                <Button onClick={()=> dispatch(increment(5))} variant="contained">5살 먹기</Button>
            </ButtonGroup>
        </Typography>
    )
}