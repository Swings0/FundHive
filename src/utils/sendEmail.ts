import nodemailer from "nodemailer";

interface DepositData {
  email: string;
  plan: string;
  amount: number;
  investmentType: string;
  transactionHash: string;
  depositTime: Date;
}

const sendEmail = async (depositData: DepositData) => {
  if (!process.env.GMAIL_USER || !process.env.GMAIL_PASS) {
    throw new Error("Gmail credentials are not set in .env.local");
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS,
    },
  });

  const mailOptions = {
    from: `"FundHive" <${process.env.GMAIL_USER}>`,
    to: process.env.OWNER_EMAIL, // Your admin email
    subject: 'New Deposit Made',
    html: `
      <h3>New Deposit</h3>
      <p><strong>Email:</strong> ${depositData.email}</p>
      <p><strong>Plan:</strong> ${depositData.plan}</p>
      <p><strong>Amount:</strong> $${depositData.amount.toFixed(2)}</p>
      <p><strong>Investment Type:</strong> ${depositData.investmentType}</p>
      <p><strong>Transaction Hash:</strong> ${depositData.transactionHash}</p>
      <p><strong>Deposit Time:</strong> ${depositData.depositTime.toLocaleString()}</p>
    `,
  };

  try {
    // Send email
    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

export default sendEmail;
