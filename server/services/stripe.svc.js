var stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
exports.charge = function(token, amt) {
    return stripe.charges.create({        
        amount: amt * 100, // amount in cents        
        currency: 'usd',        
        source: token,        
        description: 'Statement description'    
    });
    // returning a promise, so when we call .charge, we can use .then(...)
}