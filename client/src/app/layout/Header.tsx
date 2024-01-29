import { AppBar, Badge, IconButton, List, ListItem, Toolbar, Typography } from '@mui/material'
import CustomizedSwitches from '../components/ThemeBtn'
import { NavLink } from 'react-router-dom'
import { ShoppingCart } from '@mui/icons-material'

const midLinks = [
  {title: 'catalog', path: '/catalog'},
  {title: 'about', path: '/about'},
  {title: 'contact', path: '/contact'},
]


const rightLinks = [
  {title: 'login', path: '/login'},
  {title: 'register', path: '/register'},  
]

export type HeaderType = {
  setTheme: ()=> void;
}

export default function Header({setTheme}:HeaderType) {
  
  return (
    <AppBar position='static' sx={{mb: 4}}>
      <Toolbar>
        <Typography variant='h6' component={NavLink} to={'/'} key={'home'} sx={{color: 'inherit', textDecoration:'none'}}>
          WooPang
        </Typography>
        <CustomizedSwitches setTheme={setTheme}/>
        <List sx={{display:'flex'}}>
          {midLinks.map(({title, path}) => (
            <ListItem component={NavLink} to={path} key={path} sx={{color: 'inherit', typography: 'h6'}}>
              {title.toUpperCase()}
            </ListItem>
          ))}
        </List>

        <IconButton size='large' edge='start' color='inherit' sx={{mr: 2}}>
            <Badge badgeContent='4' color='secondary'>
                <ShoppingCart/>
            </Badge>
        </IconButton>

        <List sx={{display:'flex'}}>
          {rightLinks.map(({title, path}) => (
            <ListItem component={NavLink} to={path} key={path} sx={{color: 'inherit', typography: 'h6'}}>
              {title.toUpperCase()}
            </ListItem>
          ))}
        </List>
      </Toolbar>
    </AppBar>
  )
}
