const express = require('express');
const router = express.Router();

const { check, validationResult } = require('express-validator')

// GET Home 
router.get('/', (req, res, next) => {
  res.render('index', { 
    title: 'Rates Calculator Webpage' 
  });
});

// GET Rates Settlement Calculator
router.get('/form', (req, res, next) => {
  res.render('form', { 
    title: 'Rates Calculator Form' 
  });
});

// POST Rates Settlement Calculator
router.post('/form', [
  //check('district_council').isLength({ min: 1 }),
  //check('annual_dc_rates')
  //.isNumeric()
  //.withMessage('Must be a number'),
  //check('regional_council').isLength({ min: 1 }),
  //check('annual_rc_rates').isNumeric(),
  //check('settlement_date').isDate()
], (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() })
  }

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

  const gstCalcs = require('../public/javascripts/gst_calc.js')
  
  const amount = parseFloat(req.body.amount, 10);
  const method = req.body.GST_method;
  const gst = gstCalcs.calculateGST(amount, method).toFixed(2);
  const subtotal = gstCalcs.calculateSubtotal(amount, method).toFixed(2);
  const total = gstCalcs.calculateTotal(amount, method, subtotal).toFixed(2);

  res.render('gst_calculator_output', {
    subtotal: subtotal,
    gst: gst,
    total: total,
  })
})

// GET Interest Calculator
router.get('/interest_calculator', (req, res, next) => {
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
  
  const interestCalcs = require('../public/javascripts/interest_calcs.js')

  const debt = parseFloat(req.body.debt, 10);
  const interestRate = parseFloat(req.body.interest_rate, 10);  
  const startDate = req.body.start_date;
  const endDate = req.body.end_date; 
  const daysOverdue = interestCalcs.daysOverdue(startDate, endDate);
  const dailyInterest = interestCalcs.dailyInterest(debt, interestRate);
  const interest = interestCalcs.interestAmount(daysOverdue, dailyInterest);
  const totalDue = interestCalcs.totalDebt(debt, interest);

  res.render('interest_calculator_output', {
    debt: debt.toFixed(2),
    interest: interest.toFixed(2),
    totalDue: totalDue.toFixed(2),
  })
})

// GET About
router.get('/about', (req, res, next) => {
  res.render('about');
});

// GET Contact
router.get('/contact', (req, res, next) => {
  res.render('contact');
});

// GET Output
router.get('/output', (req, res, next) => {
  res.render('output'/*, {
    dcInput: 'RDC',
    dcRatesInput: 2000,
    rcInput: 'BOPRC',
    rcRatesInput: 500,
    settlementDateInput: '20210-01-18'
  }*/);
});

module.exports = router;
