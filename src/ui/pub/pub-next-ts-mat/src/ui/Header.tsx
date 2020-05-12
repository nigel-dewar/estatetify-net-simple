import React, { useEffect, useState } from "react";
import {
  AppBar,
  Button,
  Menu,
  MenuItem,
  Tab,
  Tabs,
  Toolbar,
  useScrollTrigger,
  Theme,
  useMediaQuery,
  SwipeableDrawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { useTheme } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import MenuIcon from "@material-ui/icons/Menu";

import logo from "../../assets/logo.svg";

function ElevationScroll(props: any) {
  const { children } = props;
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

const useStyles = makeStyles((theme: Theme) => ({
  toolbarMargin: {
    marginBottom: "3em",
    ...theme.mixins.toolbar,
    [theme.breakpoints.down("md")]: {
      marginBottom: "2em",
    },
    [theme.breakpoints.down("xs")]: {
      marginBottom: "1.25em",
    },
  },
  logo: {
    height: "8em",
    [theme.breakpoints.down("md")]: {
      height: "7em",
    },
    [theme.breakpoints.down("xs")]: {
      height: "5.5em",
    },
  },
  logoContainer: {
    padding: 0,
    "&:hover": {
      backgroundColor: "transparent",
    },
  },
  tabContainer: {
    marginLeft: "auto",
  },
  tab: {
    minWidth: 10,
    marginLeft: "25px",
    fontFamily: "Raleway",
    textTransform: "none",
    fontWeight: 700,
    fontSize: "1rem",
  },
  button: {
    borderRadius: "50px",
    marginLeft: "50px",
    marginRight: "25px",
    height: "45px",
  },
  estimate: {
    fontFamily: "Pacifico",
    fontSize: "1rem",
    textTransform: "none",
    color: "white",
  },
  menu: {
    backgroundColor: theme.palette.primary.main,
    color: "white",
    borderRadius: "0px",
  },
  menuItem: {
    fontFamily: "Raleway",
    textTransform: "none",
    fontWeight: 700,
    fontSize: "1rem",
    opacity: 0.7,
    "&:hover": {
      opacity: 1,
    },
  },
  drawerContainer: {
    color: "white",
    marginLeft: "auto",
    "&:hover": {
      color: "pink",
    },
  },
  drawer: {
    backgroundColor: theme.palette.primary.main,
  },
  drawerItem: {
    fontFamily: "Raleway",
    textTransform: "none",
    fontWeight: 400,
    fontSize: "1rem",
    color: "white",
    opacity: 0.7,
  },
  drawerItemEstimate: {
    backgroundColor: theme.palette.secondary.main,
  },
  drawerItemSelected: {
    opacity: 1,
  },
  appbar: {
    zIndex: theme.zIndex.modal + 1
  }
}));

interface IProps {
  value: number;
  setValue: (val: number) => void;
  selectedIndex: number;
  setSelectedIndex: (val: number) =>  void;
}

const Header: React.FC<IProps> = ({
  value,
  setValue,
  selectedIndex,
  setSelectedIndex,
}) => {
  const theme = useTheme();
  const classes = useStyles();
  const matches = useMediaQuery(theme.breakpoints.down("md"));
  const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [anchorEl, setAnchorEl] = useState<Element | null>(null);
  const [openMenu, setOpenMenu] = useState(false);

  const handleChange = (newValue: number) => {
    setValue(newValue);
  };

  const handleClick = (e: any) => {
    setAnchorEl(e.currentTarget);

    setOpenMenu(true);
  };

  const handleMenuItemClick = (e: any, i: number) => {
    setAnchorEl(null);
    setOpenMenu(false);
    setSelectedIndex(i);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setOpenMenu(false);
  };

  const menuOptions = [
    { name: "Services", link: "/services", activeIndex: 1, selectedIndex: 0 },
    {
      name: "Custom Software Development",
      link: "/customsoftware",
      activeIndex: 1,
      selectedIndex: 1,
    },
    {
      name: "Mobile App Development",
      link: "/mobileapps",
      activeIndex: 1,
      selectedIndex: 2,
    },
    {
      name: "Website Development",
      link: "/websites",
      activeIndex: 1,
      selectedIndex: 3,
    },
  ];

  const routes = [
    { name: "Home", link: "/", activeIndex: 0, selectedIndex: undefined },
    {
      name: "Services",
      link: "/services",
      activeIndex: 1,
      selectedIndex: undefined,
      ariaOwns: anchorEl ? "simple-menu" : undefined,
      ariaPopup: anchorEl ? "true" : undefined,
      mouseOver: (event: any) => handleClick(event),
    },
    {
      name: "Revolution",
      link: "/revolution",
      activeIndex: 2,
      selectedIndex: undefined,
    },
    {
      name: "About Us",
      link: "/about",
      activeIndex: 3,
      selectedIndex: undefined,
    },
    {
      name: "Contact Us",
      link: "/contact",
      activeIndex: 4,
      selectedIndex: undefined,
    },
  ];

  useEffect(() => {
    [...menuOptions, ...routes].forEach((route) => {
      switch (window.location.pathname) {
        case `${route.link}`: {
          if (value !== route.activeIndex) {
            setValue(route.activeIndex);
            if (route.selectedIndex && route.selectedIndex !== selectedIndex) {
              setSelectedIndex(route.selectedIndex);
            }
          }
          break;
        }
        default:
          break;
      }
    });
  }, [value, menuOptions, selectedIndex, routes]);

  const tabs = (
    <React.Fragment>
      <Tabs
        value={value}
        onChange={(event: any, value) => handleChange(value)}
        className={classes.tabContainer}
        indicatorColor="primary"
      >
        {routes.map((route: any, index: number) => (
          <Tab
            key={`${route.name}${index}`}
            className={classes.tab}
            component={Link}
            to={route.link}
            label={route.name}
            aria-owns={route.ariaOwns}
            aria-haspopup={route.ariaPopup}
            onMouseOver={route.mouseOver}
          />
        ))}
      </Tabs>
      <Button variant="contained" color="secondary" className={classes.button}>
        Free Estimate
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        open={openMenu}
        onClose={handleClose}
        MenuListProps={{ onMouseLeave: handleClose }}
        classes={{ paper: classes.menu }}
        elevation={0}
        keepMounted
        style={{ zIndex: 1302 }}
      >
        {menuOptions.map((option, i) => (
          <MenuItem
            key={`${option.name}${i}`}
            component={Link}
            to={option.link}
            classes={{ root: classes.menuItem }}
            onClick={(event: any) => {
              handleMenuItemClick(event, i);
              setValue(1);
              handleClose();
            }}
            selected={i == selectedIndex && value === 1}
          >
            {option.name}
          </MenuItem>
        ))}
      </Menu>
    </React.Fragment>
  );

  const drawer = (
    <React.Fragment>
      <SwipeableDrawer
        disableBackdropTransition={!iOS}
        disableDiscovery={iOS}
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
        onOpen={() => setOpenDrawer(true)}
        classes={{ paper: classes.drawer }}
      >
        <div className={classes.toolbarMargin} />
        <List disablePadding>
          {routes.map((route: any, index: number) => (
            <ListItem
              key={`${route.name}${index}`}
              divider
              button
              component={Link}
              to={route.link}
              selected={value === route.activeIndex}
              onClick={() => {
                setOpenDrawer(false);
                setValue(route.activeIndex);
              }}
            >
              <ListItemText
                className={
                  value === route.activeIndex
                    ? [classes.drawerItem, classes.drawerItemSelected].join(" ")
                    : classes.drawerItem
                }
                disableTypography
              >
                {route.name}
              </ListItemText>
            </ListItem>
          ))}
          <ListItem
            onClick={() => {
              setOpenDrawer(false);
              setValue(5);
            }}
            divider
            button
            component={Link}
            to="/estimate"
            className={classes.drawerItemEstimate}
            selected={value === 5}
          >
            <ListItemText
              className={
                value === 5
                  ? [classes.drawerItem, classes.drawerItemSelected].join(" ")
                  : classes.drawerItem
              }
              disableTypography
            >
              Free Estimate
            </ListItemText>
          </ListItem>
        </List>
      </SwipeableDrawer>
      <IconButton
        onClick={() => setOpenDrawer(!openDrawer)}
        disableRipple
        className={classes.drawerContainer}
      >
        <MenuIcon />
      </IconButton>
    </React.Fragment>
  );

  return (
    <React.Fragment>
      <ElevationScroll>
        <AppBar position={"fixed"} className={classes.appbar}>
          <Toolbar disableGutters>
            <Button
              disableRipple
              onClick={() => setValue(0)}
              component={Link}
              to="/"
              className={classes.logoContainer}
            >
              <img alt="company logo" className={classes.logo} src={logo} />
            </Button>
            {matches ? drawer : tabs}
          </Toolbar>
        </AppBar>
      </ElevationScroll>
      <div className={classes.toolbarMargin} />
    </React.Fragment>
  );
};

export default Header;
