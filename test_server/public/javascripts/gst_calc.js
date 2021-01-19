const calculateGST = (amount, GST_method) => {
    const gstRate = 0.15; 
    if (GST_method === 'add_GST') {
        return (amount * gstRate);
    }
    else if (GST_method === 'subtract_GST') {
        return (amount * 3 / 23);
    }
};

const calculateSubtotal = (amount, GST_method) => {
    if (GST_method === 'add_GST') {
        return amount; 
    } 
    else if (GST_method === 'subtract_GST') {
        return amount - calculateGST(amount, GST_method);
    }
};

const calculateTotal = (amount, GST_method) => {
    if (GST_method === "add_GST") {
        return (amount + calculateGST(amount, GST_method));
    } 
    else if(GST_method === "subtract_GST") {
        return amount; 
    }
};


exports.calculateGST = calculateGST; 
exports.calculateSubtotal = calculateSubtotal; 
exports.calculateTotal = calculateTotal; 
