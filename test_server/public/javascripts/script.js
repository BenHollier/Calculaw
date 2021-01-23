
const month = require('../../routes/index.js');
const year = require('../../routes/index.js');


//Calculates if settlement date falls in a Council leap year
function calculateIsLeapYear(year, month) {
  if (year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0) && month >= 1 && month <= 6) {
  return true;
  } else if ((year + 1) % 4 === 0 && (year % 100 !== 0 || year % 400 === 0) && (month >=7 && month <= 12)) { 
  return true;
  } else {return false;}
}


//Calculates which rating system the user's Council is
function calculateRatingSystem (council) {
    if (council === 'ashburtondc' || council === 'aucklandc' || council === 'bullerdc' || council === 'cartertondc' || council === 'centralhawkesbaydc' || council === 'centralotagodc' || council === 'christchurchcc' || council === 'cluthadc' || council === 'dunedincc' || council === 'farnorthdc' || council === 'gisbornedc' || council === 'goredc' || council === 'greydc' || council === 'hamiltoncc' || council === 'hastingsdc' || council === 'haurakidc' || council === 'horowhenuadc' || council === 'hurunuidc' || council === 'invercargillcc' || council === 'kaikouradc' || council === 'kaiparadc' || council === 'kapiticoastdc' || council === 'kaweraudc' || council === 'mackenziedc' || council === 'manawatudc' || council === 'marlboroughdc' || council === 'mastertondc' || council === 'matamatapiakodc' || council === 'napiercc' || council === 'nelsoncc' || council === 'newplymouthdc' || council === 'opotikidc' || council === 'palmerstonnorthcc' || council === 'poriruacc' || council === 'queenstownlakesdc' || council === 'rangitikeidc' || council === 'rotoruadc' || council === 'ruapehudc' || council === 'selwyndc' || council === 'southtaranakidc' || council === 'southwaikatodc' || council === 'southwairarapadc' || council === 'southlanddc' || council === 'stratforddc' || council === 'taranakirc' || council === 'tararuadc' || council === 'tasmandc' || council === 'taupodc' || council === 'timarudc' || council === 'waimakariridc' || council === 'waimatedc' || council === 'waipadc' || council === 'wairoadc' || council === 'waitakidc' || council === 'waitomodc' || council === 'wellingtoncc' || council === 'westlanddc' || council === 'whakatanedc' || council === 'whanganuidc' || council === 'whangareidc') {
        return 'Quarterly';
    } else if (council === 'boprc' || council === 'canterburyrc' || council === 'hawkesbayrc' || council === 'manawatuwanganuirc' || council === 'northlandrc' || council === 'otagorc' || council === 'southlandrc' || council === 'waikatorc' || council === 'wellingtonrc') {
        return 'Annual';
    } else if (council === 'otorohangadc'|| council === 'taurangacc' || council === 'westcoastrc' || council === 'westernbopdc') {
        return 'Biannual';
    } else if (council === 'chathamislandsc' || council === 'thamescoromandeldc' || council === 'waikatodc') {
        return 'Triannual';
    } else if (council === 'huttcc') {
        return 'Bimonthly';
    }
}

//Calculates the number of days the vendor will have title in rating period 
function calculateVendorDays(ratingSystem, month, day, isLeapYear) {
  if (ratingSystem === 'Quarterly') {
      if (month === 1 || month === 4 || month === 7 || month == 10) {
          return day;
      } else if (month === 2 || month === 8 || month === 11) {
          return 31 + day;
      } else if (month === 3) {
          if (!isLeapYear) {
              return 59 + day;
          } else { return 60 + day; }
      } else if (month === 5) {
          return 30 + day;
      } else if (month === 6 || month === 12) {
          return 61 + day;
      } else if (month === 9) {
          return 62 + day;
      }
  } else if (ratingSystem === 'Annual') {
      if (month === 1) {
          return 184 + day;
      } else if (month === 2) {
          return 215 + day;
      } else if (month === 3) {
          if (!isLeapYear) {
              return 243 + day;
          } else { return 244 + day; }
      } else if (month === 4) {
          if (!isLeapYear) {
              return 274 + day;
          } else { return 275; }
      } else if (month === 5) {
          if (!isLeapYear) {
              return 304 + day;
          } else { return 305 + day; }
      } else if (month === 6) {
          if (!isLeapYear) {
              return 335 + day;
          } else { return 336 + day; }
      } else if (month === 7) {
          return day;
      } else if (month === 8) {
          return 31 + day;
      } else if (month === 9) {
          return 62 + day;
      } else if (month === 10) {
          return 92 + day;
      } else if (month === 11) {
          return 123 + day;
      } else if (month === 12) {
          return 153 + day;
      }
  }
  else if (ratingSystem === 'Biannual') {
      if (month === 1) {
          return day;
      } else if (month === 2) {
          return 31 + day;
      } else if (month === 3) {
          if (!isLeapYear) {
              return 59 + day;
          } else { return 60 + day; }
      } else if (month === 4) {
          if (!isLeapYear) {
              return 90 + day;
          } else { return 91 + day; }
      } else if (month === 5) {
          if (!isLeapYear) {
              return 120 + day;
          } else { return 121 + day; }
      } else if (month === 6) {
          if (!isLeapYear) {
              return 151 + day;
          } else { return 152 + day; }
      } else if (month === 7) {
          return day;
      } else if (month === 8) {
          return 31 + day;
      } else if (month === 9) {
          return 62 + day;
      } else if (month === 10) {
          return 92 + day;
      } else if (month === 11) {
          return 123 + day;
      } else if (month === 12) {
          return 153 + day;
      }
  } else if (ratingSystem === 'Triannual') {
      if (month === 1 || month === 5) {
          return 61 + day;
      } else if (month === 2 || month === 6 || month === 10) {
          return 92 + day;
      } else if (month === 3 || month === 7 || month === 11) {
          return day;
      } else if (month === 4 || month === 8) {
          return 31 + day;
      } else if (month === 9) {
          return 62 + day;
      } else if (month === 12) {
          return 30 + day;
      }
  } else if (ratingSystem === 'Bimonthly') {
      if (month % 2 != 0) {
          return day;
      } else if (month === 2 || month === 4 || month === 6 || month === 8) {
          return 31 + day;
      } else if (month === 10 || month == 12) {
          return 30 + day;
      }
  } else {return null};
}

//Calculates the number of days the purchaser will have title in the rating period based on the number of purchaser days 
function calculatePurchaserDays(ratingSystem, month, vendorDays, isLeapYear) {
  if (ratingSystem === 'Quarterly') {
      if (month >= 1 && month <= 3) {
          if (!isLeapYear) {
              return 90 - vendorDays;
          } else { return 91 - vendorDays; }
      } else if (month >= 4 && month <= 6) {
          return 91 - vendorDays;
      } else if (month >= 7 && month <= 12) {
          return 92 - vendorDays;
      }
  } else if (ratingSystem === 'Annual') {
      if (!isLeapYear) {
          return 365 - vendorDays;
      } else { return 366 - vendorDays; }
  } else if (ratingSystem === 'Biannual') {
      if (month <= 6) {
          if (!isLeapYear) {
              return 181 - vendorDays;
          } else { return 182 - vendorDays; }
      }
      else if (month >= 7 && month <= 12) {
          return 184 - vendorDays;
      }
  } else if (ratingSystem === 'Triannual') {
      if (month === 11 || month === 12 || month === 1 || month === 2) {
          if (!isLeapYear) {
              return 120 - vendorDays;
          } else { return 121 - vendorDays; }
      } else if (month >= 3 && month <= 6) {
          return 122 - vendorDays;
      } else if (month >= 7 && month <= 10) {
          return 123 - vendorDays;
      }
  } else if (ratingSystem === 'Bimonthly') {
      if (month === 1 || month === 2) {
          if (!isLeapYear) {
              return 59 - vendorDays;
          } else { return 60 - vendorDays; }
      } else if ((month >= 3 && month <= 6) || (month >= 9 && month <= 12)) {
          return 61 - vendorDays;
      } else if (month === 7 || month === 8) {
          return 62 - vendorDays;
      }
  };
}

//Calculates how many days in rating year based on whether it's a Council leap year 
function daysInYear(isLeapYear) { 
  if (isLeapYear) {
      return 366;
  } else {return 365;}
  }
  
//Calculates daily rate that can be used to calcualte daily district level rates. Uses implicit return and rounds to 2 decimal places. 
function dailyRate(number, daysInYear) {
  return number/daysInYear;
}
 
//Calculates purhcaser's District level rates based on daily rate and purchaser days in period 
function shareOfRates(days, dailyRate) { 
  return (days * dailyRate).toFixed(2);
}

exports.calculateIsLeapYear = calculateIsLeapYear;
exports.calculateRatingSystem = calculateRatingSystem;
exports.calculateVendorDays = calculateVendorDays;
exports.calculatePurchaserDays = calculatePurchaserDays;
exports.dailyRate = dailyRate;
exports.daysInYear = daysInYear; 
exports.shareOfRates = shareOfRates; 
