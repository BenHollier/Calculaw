const express = require('express');
const router = express.Router();
const date = require('date-and-time');

const { check, validationResult } = require('express-validator')

// GET Home 
router.get('/', (req, res, next) => {
  console.log('GET request for HOME page: success')
  res.render('index', { 
    title: 'Rates Calculator Webpage' 
  });
});

// GET Rates Settlement Calculator
router.get('/form', (req, res, next) => {
  console.log('GET request for FORM page: success')
  res.render('form', { 
    title: 'Rates Calculator Form' 
  });
});

// POST Rates Settlement Calculator
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
  const daysInYear = calculate.daysInYear(isLeapYear);
  const dailyDCRates = calculate.dailyRate(annualDCRates, daysInYear);
  const dailyRCRates = calculate.dailyRate(annualRCRates, daysInYear);

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
  console.log(settlementDate);
  console.log(typeof settlementDate)
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

// GET GST Calculator
router.get('/gst_calculator', (req, res, next) => {
  console.log('GET request for GST Calculator: success')
  res.render('gst_calculator');
});

// POST GST Calculator
router.post('/gst_calculator', [
  check('amount').isNumeric(),
], (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() })
  }

  console.log('---')
  console.log('POST request to gst_calculator page: success')
  console.log('---')

  const gstCalcs = require('../public/javascripts/gst_calc.js')
  
  const amount = parseFloat(req.body.amount, 10);
  const method = req.body.GST_method;
  const gst = gstCalcs.calculateGST(amount, method).toFixed(2);
  const subtotal = gstCalcs.calculateSubtotal(amount, method).toFixed(2);
  const total = gstCalcs.calculateTotal(amount, method, subtotal).toFixed(2);


  console.log('---')
  console.log(req.body.amount);
  console.log(req.body.GST_method);
  console.log('---')

  console.log('---')
  console.log(amount);
  console.log(typeof amount);
  console.log(method);
  console.log(typeof method);
  console.log('---');

  res.render('gst_calculator_output', {
    subtotal: subtotal,
    gst: gst,
    total: total,
  })
})

// GET Interest Calculator
router.get('/interest_calculator', (req, res, next) => {
  console.log('GET request for Interest Calculator: success')
  res.render('interest_calculator');
});

// POST Interest Calculator
router.post('/interest_calculator', [
  //check('debt').isNumeric(),
  //check('amount').isNumeric(),
], (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() })
  }

  console.log('---')
  console.log('POST request to interest_calculator page: success')
  console.log('---')

  const interestCalcs = require('../public/javascripts/interest_calcs.js')
  
  const debt = parseFloat(req.body.debt);
  const interestRate = parseFloat(req.body.interest_rate);  
  const startDate = req.body.start_date;
  const endDate = req.body.end_date; 
  const dayStart = parseInt(startDate.slice(8, 10), 10)
  const monthStart = parseInt(startDate.slice(5, 7), 10);
  const yearStart = parseInt(startDate.slice(0, 4), 10);
  const dayEnd = parseInt(endDate.slice(8, 10), 10)
  const monthEnd = parseInt(endDate.slice(5, 7), 10);
  const yearEnd = parseInt(endDate.slice(0, 4), 10);
  const start = newDate(yearStart, monthStart, dayStart);
  const end = newDate(yearEnd, monthEnd, dayEnd);

  const daysOverdue = interestCalcs.daysOverdue(start, end);
  const dailyInterest = interestCalcs.dailyInterest(debt, interestRate).toFixed(2);
  const interestAmount = interestCalcs.interestAmount(daysOverdue, dailyInterest).toFixed(2);
  const totalDue = interestCalcs.totalDebt(debt, interestAmount).toFixed(2);

  res.render('interest_calculator_output', {
    subtotal: subtotal,
    gst: gst,
    total: totalDue,
  })
})

// GET About
router.get('/about', (req, res, next) => {
  console.log('GET request for ABOUT page: success')
  res.render('about');
});

// GET Contact
router.get('/contact', (req, res, next) => {
  console.log('GET request for CONTACT page: success')
  res.render('contact');
});

// GET Output
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
