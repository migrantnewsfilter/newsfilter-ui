import {green500, green700, green900, redA200, grey100, grey900} from 'material-ui/styles/colors';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

export default getMuiTheme({
 palette: {
    primary1Color: green500,
    primary2Color: green700,
    accent1Color: redA200,
    accent2Color: grey100,
    accent3Color: green900,
    textColor: grey900,
    pickerHeaderColor: green500
  },
});


 // palette: {
 //    primary1Color: green500,
 //    primary2Color: green700,
 //    primary3Color: grey400,
 //    accent1Color: redA200,
 //    accent2Color: grey100,
 //    accent3Color: grey500,
 //    textColor: grey900,
 //    alternateTextColor: white,
 //    canvasColor: white,
 //    borderColor: grey300,
 //    disabledColor: fade(darkBlack, 0.3),
 //    pickerHeaderColor: cyan500,
 //    clockCircleColor: fade(darkBlack, 0.07),
 //    shadowColor: fullBlack,
 //  },
