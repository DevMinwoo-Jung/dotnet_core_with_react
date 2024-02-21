import { Button, ButtonGroup, Typography } from "@mui/material";

import { decrement, increment } from "./CounterSlice";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";

export default function Contact() {
    const dispatch = useAppDispatch();
    const { data, title } = useAppSelector(state => state.counter)

    return (
        <Typography variant="h2">
            Contact Page
            {data}
            {title}
            <ButtonGroup>
                <Button onClick={()=> dispatch(decrement(1))} variant="contained">어려지기</Button>
                <Button onClick={()=> dispatch(increment(1))} variant="contained">나이먹기</Button>
                <Button onClick={()=> dispatch(increment(5))} variant="contained">5살 먹기</Button>
            </ButtonGroup>
        </Typography>
    )
}