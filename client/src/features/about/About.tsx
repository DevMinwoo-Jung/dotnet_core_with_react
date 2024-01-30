import { Button, ButtonGroup, Container, Typography } from "@mui/material";
import agent from "../../app/api/agent";

export default function About() {
    return (
        <Container>
            <Typography gutterBottom variant="h2">Error Testing</Typography>
            <ButtonGroup fullWidth>
                <Button variant="contained" onClick={() => agent.TestErrors.get400Error()}>get400Error</Button>
                <Button variant="contained" onClick={() => agent.TestErrors.get401Error()}>get401Error</Button>
                <Button variant="contained" onClick={() => agent.TestErrors.get404Error()}>get404Error</Button>
                <Button variant="contained" onClick={() => agent.TestErrors.get500Error()}>get500Error</Button>
                <Button variant="contained" onClick={() => agent.TestErrors.getValidationError()}>getValidationError</Button>
            </ButtonGroup>
        </Container>
    )
}