import {createMuiTheme, Theme} from '@material-ui/core/styles';
import {red, green, pink} from '@material-ui/core/colors';

const arcBlue = '#0B72B9';
const arcOrange = '#FFBA60';
const arcGrey = '#868686';

const theme: Theme = createMuiTheme({
  palette: {
    common: {
      white: "",
      black: "",
    },
    primary: {
      main: `${arcBlue}`,
    },
    secondary: {
      main: `${arcOrange}`,
    },
    icon: {
      pdf: pink[400],
    },
  },
  typography: {
    h2: {
      fontFamily: "Raleway",
      fontWeight: 700,
      fontSize: "2.5rem",
      color: `${arcBlue}`,
      lineHeight: 1.5,
    },
    h4: {
      fontFamily: "Raleway",
      fontWeight: 700,
      fontSize: "1.75rem",
      color: `${arcBlue}`
    },
    subtitle1: {
      fontSize: '1.25rem',
      fontWeight: 300,
      color: `${arcGrey}`
    }
  },
});

export default theme;