const daysOverdue = (start, end) => {
    let timeDifference = start.getTime() - end.getTime();
    let dayDifference = timeDifference / (1000 * 60 * 60 * 24);
    return dayDifference; 
}

const dailyInterest = (debt, interestRate) => {
    return debt * (interestRate / 100) * 365;
};

const interestAmount = (daysOverdue, dailyInterest) => {
    return daysOverdue * dailyInterest; 
};

const totalDebt = (debt, interestAmount) => {
    return debt + interestAmount; 
};


exports.daysOverdue = daysOverdue; 
exports.dailyInterest = dailyInterest; 
exports.interestAmount = interestAmount; 
exports.totalDebt = totalDebt; 