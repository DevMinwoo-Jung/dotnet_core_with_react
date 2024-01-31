import { Button, ButtonGroup, Container, Typography } from "@mui/material";
import agent from "../../app/api/agent";

export default function About() {
    return (
        <Container>
            <Typography gutterBottom variant="h2">Error Testing</Typography>
            <ButtonGroup fullWidth>
                <Button variant="contained" onClick={() => agent.TestErrors.get400Error().catch(error => console.log(error))}>get400Error</Button>
                <Button variant="contained" onClick={() => agent.TestErrors.get401Error().catch(error => console.log(error))}>get401Error</Button>
                <Button variant="contained" onClick={() => agent.TestErrors.get404Error().catch(error => console.log(error))}>get404Error</Button>
                <Button variant="contained" onClick={() => agent.TestErrors.getValidationError().catch(error => console.log(error))}>getValidationError</Button>
                <Button variant="contained" onClick={() => agent.TestErrors.get500Error().catch(error => console.log(error))}>get500Error</Button>
            </ButtonGroup>
        </Container>
    )
}