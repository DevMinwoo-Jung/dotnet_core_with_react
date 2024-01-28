import { AppBar, Toolbar, Typography } from '@mui/material'
import CustomizedSwitches from '../components/ThemeBtn'

export type HeaderType = {
  setTheme: ()=> void;
}

export default function Header({setTheme}:HeaderType) {
  
  return (
    <AppBar position='static' sx={{mb: 4}}>
      <Toolbar>
        <Typography variant='h6'>
          WooPang
        </Typography>
        <CustomizedSwitches setTheme={setTheme}/>
      </Toolbar>
    </AppBar>
  )
}
