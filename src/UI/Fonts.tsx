import {store} from '../Redux/store';

// english fonts
const IBMPlexSansEnglish = 'IBMPlexSans_Condensed-Bold';

// arabic fonts
const IBMPlexSansArabic = 'IBMPlexSansArabic-Bold';

export function FONT_FAMILY() {
  // english fonts
  if (store.getState().App.lang == 'ar') {
    return IBMPlexSansArabic;
  }
  // arabic fonts
  else {
    return IBMPlexSansEnglish;
  }
}
