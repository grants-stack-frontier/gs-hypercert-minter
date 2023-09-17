import type { StylesConfig } from "react-select";
import type { optionType } from "./types";


export const customStyles: StylesConfig<optionType> = {
    control: (styles) => ({ ...styles, backgroundColor: "white" }),
    option: (styles, { isDisabled, isFocused, isSelected }): never => {
        let backgroundColor, textColor, cursorType;

        if (isDisabled) {
            backgroundColor = 'default-grey';
            textColor = "#ccc";
            cursorType = "not-allowed";
        }
        else if (isSelected && isFocused) {
            backgroundColor = `rgba(237, 249, 179, 0.5)`;
            textColor = 'green';
            cursorType = "default";
        }
        else if (isSelected) {
            textColor = "default-grey";
            cursorType = "default";

        } else if (isFocused) {
            textColor = 'green';
            backgroundColor = `rgba(237, 249, 179, 0.5)`;
            cursorType = "default";
        }
        else {
            textColor = 'default-grey';
            cursorType = "default";

        }

        const activeStyle = {
            ...styles[":active"],
            backgroundColor: !isDisabled && (isSelected ? "mid-green" : "light-grey"),
        };

        return {
            ...styles,
            backgroundColor: backgroundColor,
            color: textColor,
            cursor: cursorType,
            ":active": activeStyle,
        } as never
    }
    ,
    input: (styles) => ({ ...styles, ...{ color: "green", p: '4px' } }),
    placeholder: (styles) => ({ ...styles, ...{ color: "dark-grey" } }),
    singleValue: (styles) => ({ ...styles, ...{ color: "dark-grey" } }),
    multiValue: (styles) => ({ ...styles, ...{ backgroundColor: `rgba(237, 249, 179, 0.8)`, padding: '6px 4px', minWidth: 'max', borderRadius: '4px' } }),
    valueContainer(styles) {
        return {
            ...styles,
            height: '54px',
            padding: '0 6px',
            color: 'dark-grey',
        };
    }
};
