const daysOverdue = (startDate, endDate) => {
    const start = new Date(startDate) 
    const end = new Date(endDate) 
    let dayCount = 0
  
    while (end > start) {
      dayCount++
      start.setDate(start.getDate() + 1)
    }
return Number(dayCount);
}
    
const dailyInterest = (debt, interestRate) => {
    return Number(debt * (interestRate / 100) / 365);
};

const interestAmount = (daysOverdue, dailyInterest) => {
    return Number(daysOverdue * dailyInterest); 
};

const totalDebt = (debt, interestAmount) => {
    return Number(debt + interestAmount); 
};


exports.daysOverdue = daysOverdue; 
exports.dailyInterest = dailyInterest; 
exports.interestAmount = interestAmount; 
exports.totalDebt = totalDebt; 