export const Colors = {
  backgroundColor: {
    dark: '#25142D',
  },
  mainGradient: {
    1: '#7B4397',
    2: '#DB2431',
  },
}

const Theme = {
  dark: {
    background: Colors.backgroundColor.dark,
    color: Colors.mainGradient[2],
    componentPrimaryColor: '#ccc',
    colorHover: '#aaa',
  },
}

export default Theme
