import { AppBar, Badge, Box, IconButton, List, ListItem, Toolbar, Typography } from '@mui/material'
import CustomizedSwitches from '../components/ThemeBtn'
import { Link, NavLink } from 'react-router-dom'
import { ShoppingCart } from '@mui/icons-material'
import { useStoreContext } from '../context/StoreContext'

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

const navStyle = {
    color: 'inherit', 
    typography: 'h6', 
    textDecoration: 'none',
    '&:hover':{
      color: 'grey.500'
    },'&.active': {
      color: 'text.secondary'
    },
}


export default function Header({setTheme}:HeaderType) {

  const {basket} = useStoreContext();
  const itemCount = basket?.items.reduce((sum, item) => sum + item.quantity, 0)
  
  return (
    <AppBar position='static' sx={{mb: 4}}>
      <Toolbar sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
        <Box display='flex' alignItems='center'>
          <Typography variant='h6' component={NavLink} to={'/'} key={'home'} sx={{color: 'inherit', textDecoration:'none'}}>
            WooPang
          </Typography>
          <CustomizedSwitches setTheme={setTheme}/>
        </Box>

          <List sx={{display:'flex'}}>
            {midLinks.map(({title, path}) => (
              <ListItem component={NavLink} to={path} key={path} 
              sx={navStyle}>
                {title.toUpperCase()}
              </ListItem>
            ))}
          </List>

        <Box display='flex' alignItems='center'>
          <IconButton component={Link} to='/basket' size='large' edge='start' color='inherit'             
              sx={navStyle}>
              <Badge badgeContent={itemCount} color='secondary'>
                  <ShoppingCart/>
              </Badge>
          </IconButton>
          <List sx={{display:'flex'}}>
            {rightLinks.map(({title, path}) => (
              <ListItem component={NavLink} to={path} key={path}             
              sx={navStyle}>
                {title.toUpperCase()}
              </ListItem>
            ))}
          </List>
        </Box>
      </Toolbar>
    </AppBar>
  )
}
