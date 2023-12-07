const sgMail = require('@sendgrid/mail')
const {get} = require('../helpers/axios/index');

/**
 * Get the list of Products from the given API
 * 
 * @param {*} req 
 * @param {*} res 
 */
const getProducts = async (req, res) => {
    try {
        const response = await get('/products');

        res.json(response);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

/**
 * Get Top Products
 */
const getTopProducts = async (req, res) => {
    try {
        const response = await get('/products');

        const topProducts = response
            .sort((a, b) => b.rating.rate - a.rating.rate)
            .slice(0, 5);
  
        res.json(topProducts);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    } 
}

/**
 * Send an Enquiry Form
 * 
 * @param {*} req 
 * @param {*} res 
 */
const storeEnquire = (req, res) => {
    const { email, message } = req.body;
    
    const msg = {
        to: email, 
        from: 'test@example.com', 
        subject: 'Product Enquiry',
        text: message,
    }
    
    res.json({message: 'Thank Your for your Enquiry!'});
    // sgMail
    //     .send(msg)
    //     .then((response) => {
    //         console.log(response[0].statusCode)
    //         console.log(response[0].headers)

    //         res.json({message: 'Thank Your for your Enquiry!'});
    //     })
    //     .catch((error) => {
    //         console.error(error)

    //         res.status(error.code).json({ error: 'Internal Server Error'});
    //     })
}

module.exports = {
    getProducts,
    getTopProducts,
    storeEnquire
};