import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
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
        // background: "#254D32",
        background: "#FEFFFD",
        color: "dark-grey",
        overflowX: "hidden",
        scrollBehavior: "smooth",
        boxSizing: "border-box",
        // backgroundImage: "url('https://greenpill.network/src/images/greenpill-bg.png')",
        backgroundPosition: "top",
        backgroundRepeat: "repeat",
        backgroundSize: "contain",
        fontWeight: "500",
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
          bg: "mid-green",
          transform: "translate(2px, 2px)",
        },
      },
      variants: {
        "primary": {
          bg: "dark-green",
          color: "green",
          borderColor: "green",
          _hover: {
            bg: "mid-green",
            color: "white",
            transform: "translate(2px, 2px)",
          },
        },
        "secondary": {
          bg: "dark-green",
          color: "green",
          borderColor: "green",
          _hover: {
            bg: "mid-green",
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
          color: "mid-green",
          transform: "translate(2px, 2px)",
        },
      }
    },
    Input: {
      parts: ['field'],
      baseStyle: {
        field: {
          borderColor: "default-grey",
          border : "2px solid",
          color : "dark-grey",
          _focus: {
            borderColor: "active-blue",
            ringColor: "transparent",
          },
          _placeholder: {
            color: "default-grey",
          },
          _hover: {
            borderColor: "mid-green",
          },
        },
      },
      defaultProps: {
        focusBorderColor: 'active-blue',
      },
    },
    Textarea: {
      baseStyle: {
        field: {
          _placeholder: {
            color: "default-grey",
          },
          color: "dark-grey",
          fontSize: "md",
          _hover: {
            borderColor: "mid-green",
          },
        },
      },
      sizes: {
        md: {
          field: {
            borderRadius: "none",
            
          },
        },
      },
      defaultProps: {
        focusBorderColor: 'active-blue',
        
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


