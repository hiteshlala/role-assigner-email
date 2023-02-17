const nodemailer = require('nodemailer');

const { username, password, players, roles, name, service } = require('./config.json');

const fromEmail = `${name} <${username}>`

const transporter = nodemailer.createTransport({
  service: service,
  secure: false,
  auth: {
    user: username,
    pass: password,
  },
});

async function sendMessage(sendTo, message) {
  return transporter.sendMail({
    from: fromEmail,
    to: sendTo,
    subject: 'Your role for todays game',
    html: `<h3>Game Day Role!</h3>
    <p>${message}</p>
    `,
  });
}

async function runner() {
  try {
    for (let person of players) {
      const idx = Math.floor(Math.random() * roles.length);
      const shouldplay = roles.splice(idx, 1)[0];
      // console.log(shouldplay, '\t', person);
      console.log('\tSending to:', person);
      const result = await sendMessage(person, `Your role: ${shouldplay}`);
      console.log(result);
    }
  }
  catch(e) {
    console.log(e);
  }
}

runner().catch(console.log);
