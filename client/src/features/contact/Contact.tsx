import { Button, ButtonGroup, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { CounterState, DECREMENT_COUNTER, INCREMENT_COUNTER } from "./counterReducer";

export default function Contact() {
    const dispatch = useDispatch();
    const { data, title } = useSelector((state: CounterState) => state);

    return (
        <Typography variant="h2">
            Contact Page
            {data}
            {title}
            <ButtonGroup>
                <Button onClick={()=> dispatch({type: DECREMENT_COUNTER})} variant="contained">어려지기</Button>
                <Button onClick={()=> dispatch({type: INCREMENT_COUNTER})} variant="contained">나이먹기</Button>
            </ButtonGroup>
        </Typography>
    )
}