import React, { useState } from 'react'

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';


import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import { useAuthState } from 'react-firebase-hooks/auth'
import { styled, createTheme, ThemeProvider } from '@mui/material/styles'
import MuiDrawer from '@mui/material/Drawer'
import Box from '@mui/material/Box'
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import List from '@mui/material/List'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import Badge from '@mui/material/Badge'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import Avatar from '@mui/material/Avatar'
import MenuIcon from '@mui/icons-material/Menu'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import NotificationsIcon from '@mui/icons-material/Notifications'
import { FaWalking,FaRunning,FaCarCrash} from 'react-icons/fa'
import { GiPerson } from 'react-icons/gi'

import { MdAccessibility } from "react-icons/md";



import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import SearchBar from "material-ui-search-bar";





import { mainListItems } from './listItems'
import SignOut from './SignOut'
import Footer from './Footer'
import Title from './Title'

import { auth } from '../Firebase'
import ActivityCard from './ActivityCard';




const drawerWidth = 240

interface AppBarProps extends MuiAppBarProps {
  open?: boolean
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open'
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  })
}))

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(({ theme, open }) => ({
  '& .MuiDrawer-paper': {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    }),
    boxSizing: 'border-box',
    ...(!open && {
      overflowX: 'hidden',
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up('sm')]: {
        width: theme.spacing(9)
      }
    })
  }
}))

const mdTheme = createTheme()


interface food {
  name: string;
  calories: string;
  fat: string;
  carbs: string;
  protein: string;
}

const useStyles = makeStyles({
  table: {
    minWidth: 650
  }
});

const originalRows: food[] = [
  { name: "Adarsh", calories: "Walking", fat: "Travelling", carbs: "", protein: "" },
  { name: "Ashsish", calories: "Type While Walk ", fat: "Idle", carbs: "", protein: "" },
  { name: "Tushar", calories: "Typing", fat: "Walking", carbs: "", protein: "" },
  { name: "Abin", calories: "Idle", fat: "Cycling", carbs: "", protein: "" },
  { name: "Rameez", calories: "Cycling", fat: "Idle", carbs: "", protein: "" },
  { name: "Ron", calories: "Idle", fat: "Running", carbs: "", protein: "" }
];



export default function Dashboard() {
  const [currentUser] = useAuthState(auth)
  const [open, setOpen] = useState(true)
  const toggleDrawer = () => setOpen((prev) => !prev)


  const [rows, setRows] = useState<food[]>(originalRows);
  const [searched, setSearched] = useState<string>("");
  const classes = useStyles();

  const requestSearch = (searchedVal: string) => {
    const filteredRows = originalRows.filter((row) => {
      return row.name.toLowerCase().includes(searchedVal.toLowerCase());
    });
    setRows(filteredRows);
  };

  const cancelSearch = () => {
    setSearched("");
    requestSearch(searched);
  };




  return (
    <Router>
      <ThemeProvider theme={mdTheme}>
        <Box sx={{ display: 'flex' }}>
          <AppBar position='absolute' open={open}>
            <Toolbar
              sx={{
                pr: '24px' // keep right padding when drawer closed
              }}
            >
              <IconButton
                edge='start'
                color='inherit'
                aria-label='open drawer'
                onClick={toggleDrawer}
                sx={{
                  marginRight: '36px',
                  ...(open && { display: 'none' })
                }}
              >
                <MenuIcon />
              </IconButton>
              <Typography component='h1' variant='h6' color='inherit' noWrap sx={{ flexGrow: 1 }}>
                Welcome {currentUser.displayName}!
              </Typography>
              <IconButton color='inherit' sx={{ mr: 2 }}>
                <Badge badgeContent={4} color='secondary'>
                  <NotificationsIcon />
                </Badge>
              </IconButton>
              <Avatar alt={currentUser.displayName} src={currentUser.photoURL} sx={{ mr: 2 }} />
              <SignOut />
            </Toolbar>
          </AppBar>
          <Drawer variant='permanent' open={open}>
            <Toolbar
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end',
                px: [1]
              }}
            >
              <IconButton onClick={toggleDrawer}>
                <ChevronLeftIcon />
              </IconButton>
            </Toolbar>
            <Divider />
            <List>{mainListItems}</List>
            <Divider />
            
          </Drawer>
          <Box
            component='main'
            sx={{
              backgroundColor: (theme) =>
                theme.palette.mode === 'light' ? theme.palette.grey[100] : theme.palette.grey[900],
              flexGrow: 1,
              height: '100vh',
              overflow: 'auto'
            }}
          >
            <Toolbar />
            <Container maxWidth='lg' sx={{ mt: 4, mb: 4 }}>
              <Grid container spacing={3}>
                <Switch>
                  {/* Dashboard */}
                  <Route path='/dashboard'>
    {/* <ActivityCard
activityName='Walking'
icon={  <FaWalking />} />
    <ActivityCard
activityName='Running'
icon={   <FaRunning />} />
<ActivityCard
activityName='Idle'
icon={<MdAccessibility/>} /> */}

<br/>
<br/>
<br/>

<Paper>
        <SearchBar
          value={searched}
          onChange={(searchVal) => requestSearch(searchVal)}
          onCancelSearch={() => cancelSearch()}
        />
        <TableContainer>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Person</TableCell>
                <TableCell align="right">Current State</TableCell>
                <TableCell align="right">Prev State&nbsp;(30s)</TableCell>
                <TableCell align="right">Prev&nbsp;(5min)</TableCell>
                <TableCell align="right">Prev&nbsp;(10min)</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.name}>
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="right">{row.calories}</TableCell>
                  <TableCell align="right">{row.fat}</TableCell>
                  <TableCell align="right">{row.carbs}</TableCell>
                  <TableCell align="right">{row.protein}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>


  















                  </Route>
                  {/* Orders */}
            
                  {/* Redirect none matches routes */}
                  <Route render={() => <Redirect to='/dashboard' />} />
                </Switch>
              </Grid>
              <Footer />
            </Container>
          </Box>
        </Box>
      </ThemeProvider>
    </Router>
  )
}
