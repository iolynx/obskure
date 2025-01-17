/* eslint-disable prettier/prettier */
import * as React from 'react'
import PropTypes from 'prop-types'
import { ThemeProvider, createTheme } from '@mui/material/styles'

import { inputsCustomizations } from './customizations/inputs'
import { dataDisplayCustomizations } from './customizations/dataDisplay'
import { feedbackCustomizations } from './customizations/feedback'
import { navigationCustomizations } from './customizations/navigation'
import { surfacesCustomizations } from './customizations/surfaces'
import { colorSchemes, typography, shadows, shape } from './themePrimitives'
import { BorderColor } from '@mui/icons-material'

function AppTheme(props) {
  const { children, disableCustomTheme, themeComponents } = props
  const theme = createTheme({
    // For more details about CSS variables configuration, see https://mui.com/material-ui/customization/css-theme-variables/configuration/
    cssVariables: {
      colorSchemeSelector: 'data-mui-color-scheme',
      cssVarPrefix: 'template'
    },
    colorSchemes, // Recently added in v6 for building light & dark mode app, see https://mui.com/material-ui/customization/palette/#color-schemes
    typography,
    shadows,
    shape,
    components: {
      MuiTooltip: {
        styleOverrides: {
          root: {
            backgroundColor: 'rgba(10, 10, 10, 0.5)'
          }
        }
      },
      MuiButton: {
        styleOverrides: {
          root: {
            borderColor: 'rgb(151, 59, 77)', // Custom border color
            backgroundColor: 'rgb(11, 14, 20)', // Custom background color
            color: '#fff', // Text color (optional)
            borderWidth: '20px', // Border width
            borderStyle: 'solid', // Border style
            '&:hover': {
              backgroundColor: 'rgb(15, 18, 25)' // Darker shade for hover
            }
          }
        }
      },
      MuiDivider: {
        styleOverrides: {
          root: {
            backgroundColor: 'hsl(0 0% 45%)',
            color: 'hsl(0 0% 45%)'
          }
        }
      },
      ...inputsCustomizations,
      ...dataDisplayCustomizations,
      ...feedbackCustomizations,
      ...navigationCustomizations,
      ...surfacesCustomizations,
      ...themeComponents
    }
  })

  return (
    <ThemeProvider theme={theme}>
      {children}
    </ThemeProvider>
  )
}

AppTheme.propTypes = {
  children: PropTypes.node,
  /**
   * This is for the docs site. You can ignore it or remove it.
   */
  disableCustomTheme: PropTypes.bool,
  themeComponents: PropTypes.object
}

export default AppTheme
