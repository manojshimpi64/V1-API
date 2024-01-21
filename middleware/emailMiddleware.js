const nodemailer = require('nodemailer');
const handlebars = require('handlebars');
const fs = require('fs').promises;
const path = require('path');

async function sendMail(user, callback) {
  try {
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      }
    });

    // Construct the file path using path.join for cross-platform compatibility
    const filePath = path.join(__dirname, 'email_templatess.html');
    
    // Read the HTML file
    const html = await fs.readFile(filePath, 'utf8');

    // Pass Data
    let template = handlebars.compile(html);
    let htmlToSend = template(user);

    let mailOptions = {
      from: 'Api Rest <sasa@gmail.com>',
      to: user.email_id,
      subject: `${user.subject}`,
      html: htmlToSend
    };

    // send mail with defined transport object
    let info = await transporter.sendMail(mailOptions);

    callback(info);
  } catch (error) {
    console.error('Error:', error.message);
    // Handle the error appropriately, e.g., throw it or log it
    throw error;
  }
}

module.exports = { sendMail };
