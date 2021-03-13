import React, { useState } from "react";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import MailIcon from "@material-ui/icons/Mail";
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import logo from '../../Assets/Blue.png';
import Grid from '@material-ui/core/Grid';
import MyCourses from '../../User_Module/Home_Container/My_Courses/My_Courses';
import BatchDetails from '../../User_Module/Home_Container/Batch_Details/Batch_Details';
import AccessResources from '../../User_Module/Home_Container/Access_Resources/Access_Resources';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import './Header.scss';
import { Link, Switch, useRouteMatch } from 'react-router-dom';
import UserDetail from "../../User_Module/Home_Container/User_Detail";
import { ProtectedRoute } from "../../auth/ProtectedRoute";
import BatchList from "../../User_Module/Batch_List/Batch_List";
import DetailsIcon from '@material-ui/icons/Details';
import AccessibilityIcon from '@material-ui/icons/Accessibility';
import DashboardIcon from '@material-ui/icons/Dashboard';


const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
    root: {
        display: "flex",
        marginBottom: "16px"
    },
    drawer: {
        [theme.breakpoints.up("sm")]: {
            width: drawerWidth,
            flexShrink: 0
        }
    },
    appBar: {
        [theme.breakpoints.up("sm")]: {
            width: `calc(100% - ${drawerWidth}px)`,
            marginLeft: drawerWidth
        }
    },
    menuButton: {
        marginRight: theme.spacing(2),
        [theme.breakpoints.up("sm")]: {
            display: "none"
        }
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
        width: drawerWidth
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3)
    }
}));

function SideNavigationBar(props) {

    let { path, url } = useRouteMatch();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const [spacing, setSpacing] = React.useState(4);
    const { window } = props;
    const classes = useStyles();
    const theme = useTheme();
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const [MenuId, setMenuId] = useState('default')
    const [openModal, setOpenModal] = React.useState(false);
    const [menue, setmenue] = useState([
        { title: "My Courses", id: 'myCourses', path: 'my-courses', icon: 'DetailsIcon' },
        { title: "Batch Details", id: 'batchDetails', path: 'batch-details', icon: 'DetailsIcon' },
        { title: "Access Resources", id: 'accessResources', path: 'access-resources', icon: 'DetailsIcon' }])


    const showMenuDetailHandler = (menuid = 'default') => {
        setMenuId(menuid)
        if (menuid == 'accessResources') {
            setOpenModal(true);
            props.data.history.push('/user/home/access-resources');
        } else if (menuid == 'batchDetails') {
            props.data.history.push('/user/home/batch-details');
        } else {
            props.data.history.push('/user/home');
        }
    }

    const handleModalClose = () => {
        setOpenModal(false);
        showMenuDetailHandler();
    };

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handlerLogout = () => {
        props.data.history.push('/');
    }


    const renderIcon = (menuid) => {
        if (menuid == 'accessResources') {
           return <AccessibilityIcon color="primary"/>
        } else if (menuid == 'batchDetails') {
            return <DetailsIcon color="primary"/>
        } else {
            return <DashboardIcon color="primary"/>
        }
    }
    
    const drawer = (
        <div className="header">
            <Grid item xs={12} className="Logo">
                <Grid container justify="center">
                    <img src={logo} alt="img not found" />
                </Grid>
            </Grid>
            <List>
                {menue.map((text, index) => (
                    <ListItem button key={index} onClick={() => showMenuDetailHandler(text.id)}>
                        <ListItemIcon>
                            {renderIcon(text.id)}
                        </ListItemIcon>
                        <ListItemText primary={text.title} />
                    </ListItem>
                ))}
            </List>
        </div>
    );

    const container =
        window !== undefined ? () => window().document.body : undefined;

    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar className="header-items">
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        className={classes.menuButton}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap className={classes.title}>
                        Teqstories LMS
                    </Typography>
                    <div>
                        <IconButton
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleMenu}
                            color="inherit"
                        >
                            <AccountCircle />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorEl}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={open}
                            onClose={handleClose}
                        >
                            <MenuItem onClick={handleClose}>Profile</MenuItem>
                            <MenuItem onClick={handlerLogout}>Logout</MenuItem>
                        </Menu>
                    </div>
                </Toolbar>
            </AppBar>
            <nav className={classes.drawer} aria-label="mailbox folders">
                {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                <Hidden smUp implementation="css">
                    <Drawer
                        container={container}
                        variant="temporary"
                        anchor={theme.direction === "rtl" ? "right" : "left"}
                        open={mobileOpen}
                        onClose={handleDrawerToggle}
                        classes={{
                            paper: classes.drawerPaper
                        }}
                        ModalProps={{
                            keepMounted: true // Better open performance on mobile.
                        }}
                    >
                        {drawer}
                    </Drawer>
                </Hidden>
                <Hidden xsDown implementation="css">
                    <Drawer
                        classes={{
                            paper: classes.drawerPaper
                        }}
                        variant="permanent"
                        open
                    >
                        {drawer}
                    </Drawer>
                </Hidden>
            </nav>
            <main className={classes.content}>
                <div>
                    <Switch>
                        {/* <ProtectedRoute exact path={`${path}`}>
                                <UserDetail data={props} menuID={MenuId} openModal={openModal} handleModalClose={handleModalClose} />
                            </ProtectedRoute> */}
                        {/* <ProtectedRoute path={`${path}/learner/:email`}>
                                <UserDetail />
                            </ProtectedRoute> */}
                        <ProtectedRoute exact path={`${path}`}>
                            <MyCourses data={props} />
                        </ProtectedRoute>
                        <ProtectedRoute path={`${path}/batch-details`}>
                            <BatchDetails data={props} />
                        </ProtectedRoute>
                        <ProtectedRoute path={`${path}/access-resources`}>
                            <AccessResources data={props} openModal={openModal} handleModalClose={handleModalClose} />
                        </ProtectedRoute>
                        <ProtectedRoute path={`${path}/batch-list/:batchID`} component={BatchList} />
                    </Switch>
                </div>
            </main>
        </div>
    )
}

SideNavigationBar.propTypes = {
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window: PropTypes.func
};

export default SideNavigationBar;