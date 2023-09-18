import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  fonts: {
    heading: `'Volkhov', sans-serif`,
    body: `'Raleway', sans-serif`,
  },
  colors: {
    green: "#C2E812",
    yellow: "#FFD972",
    white: "#FFFFFF",
    "dark-green": "#254D32",
    "mid-green": "#4FB477",
    "active-blue" : "#3083DC",
    "default-grey" : "#C1C1C1",
    "error-orange" : "#F7A072",
    "dark-grey" : "#666"
  },
  styles: {
    global: {
      "html, body": {
        background: "white",
        color: "dark-grey",
        overflowX: "hidden",
        scrollBehavior: "smooth",
        boxSizing: "border-box",
        fontWeight: "medium",
      },
      "p": {
        color: "white",
      },
      "section": {
        paddingX: "1rem",
      },
    }
  },
  components: {
    Button: {
      baseStyle: {
        borderRadius: "35px",
        minWidth: "160px",
        fontWeight: "700",
        padding: "0.5rem 1rem",
        transition: "all 0.1s ease-out",
        cursor: "pointer",
        _hover: {
          bg: "green",
          transform: "translate(2px, 2px)",
        },
      },
      variants: {
        "primary": {
          bg: "dark-green",
          color: "yellow",
          borderColor: "green",
          _hover: {
            bg: "green",
            color: "white",
            transform: "translate(2px, 2px)",
          },
        },
        "secondary": {
          bg: "dark-green",
          color: "green",
          borderColor: "green",
          _hover: {
            bg: "green",
            color: "white",
            transform: "translate(2px, 2px)",
          },
        },
      }
    },
    Link: {
      baseStyle: {
        padding: "0.5rem 1rem",
        color: "green",
        fontWeight: "500",
        transition: "all 0.1s ease-out",
        cursor: "pointer",
        _hover: {
          color: "green",
          transform: "translate(2px, 2px)",
        },
      }
    },
    Input: {
      baseStyle: {
        field: {
          height: "60px",
          borderColor: "default-grey",
          border : "2px solid",
          fontWeight: "520",
          color : "dark-grey",
          _focus: {
            borderColor: "green",
            ringColor: "mid-green",
            backgroundColor: `rgba(237, 249, 179, 0.5)`,
          },
          _placeholder: {
            color: "default-grey",
          },
          _hover: {
            borderColor: "green",
          },
          _invalid: {
            borderColor: "error-orange",
            ringColor: "error-orange",
            backgroundColor: `rgba(247,160,114, 0.1)`,
          },
        },
      },
      defaultProps: {
        focusBorderColor: 'green'
      },
    },
    Textarea: {
      baseStyle: {
        field: {
          height: "50px",
          borderColor: "default-grey",
          border: "2px solid",
          fontWeight: "500",

          _focus: {
            borderColor: "green",
            color: 'dark-green',
            ringColor: "mid-green",
            backgroundColor: `rgba(237, 249, 179, 0.5)`,
          },
          _placeholder: {
            color: "default-grey",
          },
          _hover: {
            borderColor: "green",
          },
          _invalid: {
            borderColor: "error-orange",
            ringColor: "error-orange",
            backgroundColor: `rgba(247,160,114, 0.1)`,
            textColor: 'black'
          },
        },
      },
      defaultProps: {
        focusBorderColor: 'green'
      },
    },
    FormControl: {
      baseStyle: {
        marginBottom: "20px",
      }
    },
  },
  breakpoints: {
    sm: "800px",
  }
})

export default theme;
