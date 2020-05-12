import React from "react";
import Lottie from "react-lottie";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import {Grid, Button, Typography} from '@material-ui/core'

import animationData from "../animations/landinganimation/data";
import customSoftwareIcon from '../assets/CustomSoftwareIcon.svg';

const useStyles = makeStyles((theme) => ({
  animation: {
    maxWidth: "50em",
    minWidth: "21em",
    marginTop: "2em",
    marginLeft: "10%",
    [theme.breakpoints.down("sm")]: {
      maxWidth: '30em'
    },
  },
  estimateButtonStyle: {
    fontFamily: "Pacifico",
    fontSize: "1rem",
    textTransform: "none",
    color: "white",
    backgroundColor: theme.palette.secondary.main,
    borderRadius: 50,
    width: 145,
    marginRight: 40,
    "&:hover": {
      backgroundColor: theme.palette.secondary.light,
    },
  },
  buttonContainer: {
    marginTop: "1em",
  },
  learnButtonHero: {
    borderColor: theme.palette.primary.main,
    borderWidth: 2,
    textTransform: "none",
    borderRadius: 50,
    fontFamily: "Roboto",
    fontWeight: "bold",
    fontSize: "0.9rem",
    color: theme.palette.primary.main,
    height: 45,
    width: 145,
  },
  mainContainer: {
    marginTop: "5em",
    [theme.breakpoints.down("md")]: {
      marginTop: "3em",
    },
    [theme.breakpoints.down("xs")]: {
      marginTop: "2em",
    },
  },
  heroTextContainer: {
    minWidth: "21.5em",
    marginLeft: "1em",
    [theme.breakpoints.down("xs")]: {
      marginLeft: 0,
    },
  },
}));

const LandingPage = () => {

  const classes = useStyles();
  const theme = useTheme();

  const defaultOptions = {
    loop: true,
    autoPlay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    },
  };

  return (
    <Grid container direction="column" className={classes.mainContainer}>
      <Grid item>
        {" "}
        {/*-----hero block-----*/}
        <Grid container justify="flex-end" alignItems="center" direction="row">
          <Grid sm item className={classes.heroTextContainer}>
            <Typography variant="h2" align="center">
              Bring west cost technology <br /> to the Midwest
            </Typography>
            <Grid
              container
              justify="center"
              className={classes.buttonContainer}
            >
              <Grid item>
                <Button
                  className={classes.estimateButtonStyle}
                  variant="contained"
                >
                  Free Estimate
                </Button>
              </Grid>
              <Grid item>
                <Button variant="outlined" className={classes.learnButtonHero}>
                  Learn More
                </Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid sm item className={classes.animation}>
            <Lottie options={defaultOptions} height={"100%"} width={"100%"} />
          </Grid>
        </Grid>
      </Grid>
      <Grid item>
        {" "}
        {/*-----services block-----*/}
        <Grid container direction="row">
          <Grid item>
            <Typography variant="h4">Custom Software Development</Typography>
            <Typography variant="subtitle1">
              Save Energy, Save Time, Save Money
            </Typography>
            <Typography variant="subtitle1">
              Completion digital solutions
            </Typography>
            <Button variant="outlined" className={classes.learnButtonHero}>
              Learn More
            </Button>
          </Grid>
          <Grid item>
            <img src={customSoftwareIcon} alt="custom software"/>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default LandingPage;


