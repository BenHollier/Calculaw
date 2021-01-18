const express = require('express');
const router = express.Router();
const date = require('date-and-time');

const { check, validationResult } = require('express-validator')

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log('GET request for HOME page: success')
  res.render('index', { 
    title: 'Rates Calculator Webpage' 
  });
});

router.get('/form', function(req, res, next) {
  console.log('GET request for FORM page: success')
  res.render('form', { 
    title: 'Rates Calculator Form' 
  });
});

router.post('/form', [
  check('district_council').isLength({ min: 1 }),
  check('annual_dc_rates')
  .isNumeric()
  .withMessage('Must be a number'),
  check('regional_council').isLength({ min: 1 }),
  check('annual_rc_rates').isNumeric(),
  check('settlement_date').isDate()
], (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() })
  }

  console.log('---')
  console.log('POST request to FORM page: success')
  console.log('---')

  const calculate = require('../public/javascripts/script.js')
  
  const dc = req.body.district_council;
  const annualDCRates = parseFloat(req.body.annual_dc_rates, 10);
  const rc =  req.body.regional_council;
  const annualRCRates = parseFloat(req.body.annual_rc_rates, 10);
  const settlementDate = req.body.settlement_date;
  const day = parseInt(settlementDate.slice(8, 10), 10)
  const month = parseInt(settlementDate.slice(5, 7), 10);
  const year = parseInt(settlementDate.slice(0, 4), 10);
  
  const isLeapYear = calculate.calculateIsLeapYear(year, month);
  const ratingSystemDC = calculate.calculateRatingSystem(dc);
  const ratingSystemRC = calculate.calculateRatingSystem(rc);
  const vendorDaysDC = calculate.calculateVendorDays(ratingSystemDC, month, day, isLeapYear);
  const purchaserDaysDC = calculate.calculatePurchaserDays(ratingSystemDC, month, vendorDaysDC, isLeapYear);
  const vendorDaysRC = calculate.calculateVendorDays(ratingSystemRC, month, day, isLeapYear);
  const purchaserDaysRC = calculate.calculatePurchaserDays(ratingSystemRC, month, vendorDaysRC, isLeapYear);
  const dailyDCRates = calculate.dailyRate(annualDCRates);
  const dailyRCRates = calculate.dailyRate(annualRCRates);

  const pDCRates = calculate.shareOfRates(purchaserDaysDC, dailyDCRates);
  const pRCRates = calculate.shareOfRates(purchaserDaysRC, dailyRCRates);
  const vDCRates = calculate.shareOfRates(vendorDaysDC, dailyDCRates);
  const vRCRates = calculate.shareOfRates(vendorDaysRC, dailyRCRates);

  console.log('---')
  console.log(isLeapYear)
  console.log(ratingSystemDC)
  console.log(settlementDate)
  console.log('---')

  console.log('---')
  console.log(req.body)
  console.log('---')

  console.log(dc);
  console.log(typeof dc)
  console.log(annualDCRates);
  console.log(typeof annualDCRates)
  console.log(rc);
  console.log(typeof rc)
  console.log(annualRCRates);
  console.log(typeof annualRCRates)
  //console.log(settlementDate);
  //console.log(typeof settlementDate)
  console.log('---')

  console.log('---')
  console.log(pDCRates)
  console.log(pRCRates)
  console.log(vDCRates)
  console.log(vRCRates)
  console.log('---')
   

  res.render('output', {
    dcInput: dc,
    dcRatesInput: annualDCRates,
    rcInput: rc,
    rcRatesInput: annualRCRates,
    settlementDateInput: settlementDate,
    pDaysDC: purchaserDaysDC,
    pShareDC: pDCRates,
    vDaysDC: vendorDaysDC,
    vShareDC: vDCRates,
    pDaysRC: purchaserDaysRC,
    pShareRC: pRCRates,
    vDaysRC: vendorDaysRC,
    vShareRC: vRCRates,
  })
})

router.get('/output', (req, res, next) => {
  console.log('GET request for OUTPUT page: success')
  res.render('output'/*, {
    dcInput: 'RDC',
    dcRatesInput: 2000,
    rcInput: 'BOPRC',
    rcRatesInput: 500,
    settlementDateInput: '20210-01-18'
  }*/);
});

module.exports = router;
