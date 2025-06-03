function hexToRgbA(hex: string, alpha: number) {
  if (hex.charAt(0) === '#') {
    hex = hex.substr(1);
  }
  var values = hex.split(''),
    r,
    g,
    b;

  if (hex.length === 2) {
    r = parseInt(values[0].toString() + values[1].toString(), 16);
    g = r;
    b = r;
  } else if (hex.length === 3) {
    r = parseInt(values[0].toString() + values[0].toString(), 16);
    g = parseInt(values[1].toString() + values[1].toString(), 16);
    b = parseInt(values[2].toString() + values[2].toString(), 16);
  } else if (hex.length === 6) {
    r = parseInt(values[0].toString() + values[1].toString(), 16);
    g = parseInt(values[2].toString() + values[3].toString(), 16);
    b = parseInt(values[4].toString() + values[5].toString(), 16);
  }
  return `rgba(${r}, ${g}, ${b},${alpha})`;
}

export const Colors = (alpha = 1) => {
  return {
    App: {  
      BLUE_90: hexToRgbA('#0029FF', alpha),
      BLUE_70: hexToRgbA('#4D69FF', alpha),
      BLUE_50: hexToRgbA('#8094FF', alpha),
      BLUE_20: hexToRgbA('#CCD4FF', alpha),
      BLUE_10: hexToRgbA('#E5EAFF', alpha),
      WHITE: hexToRgbA('#FFFFFF', alpha),
      DARK: hexToRgbA('#000000', alpha),
      DARK50: hexToRgbA('#767982', alpha),
      DARK_60: hexToRgbA('#A3A6AC', alpha),
      RED: hexToRgbA('#FF4343', alpha),
      GREEN: hexToRgbA('#10C100', alpha),
      GREY: hexToRgbA('#E8E9EA', alpha),
      LIGHT_GREY: hexToRgbA('#CFCFCF', alpha),
    },
    Text: {
      RED: hexToRgbA('#FF4343', alpha),
      BLUE_70: hexToRgbA('#4D69FF', alpha),
      NIGHT_Fog: hexToRgbA('#08041D', alpha),
      NEUTRAL_60: hexToRgbA('#757B8A', alpha),
      DARK: hexToRgbA('#000000', alpha),
      DARK_40: hexToRgbA('#5F636D', alpha),
      DARK50: hexToRgbA('#767982', alpha),
      DARK_60: hexToRgbA('#A3A6AC', alpha),
      DARK_70: hexToRgbA('#484D59', alpha),
      WHITE: hexToRgbA('#FFFFFF', alpha),
      LIGHT_GREY: hexToRgbA('#A4A4A4', alpha),
      PURPLE: hexToRgbA('#3E0292', alpha),
      GREY: hexToRgbA('#F5F5F5', alpha),
      GREEN: hexToRgbA('#00CEBC', alpha),
      YELLOW: hexToRgbA('#FFC727', alpha),
    },
    MessageBox: {
      Header: hexToRgbA('#ccc', alpha),
      Title: hexToRgbA('#000', alpha),
      CloseBackground: hexToRgbA('#aaa', alpha),
      CloseIcon: hexToRgbA('#ccc', alpha),
      Body: hexToRgbA('#FFF', alpha),
      Message: hexToRgbA('#000', alpha),
    },
  };
};
