const functions = require("firebase-functions");
const admin = require("firebase-admin");
const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  //service: "gmail",
  auth: {
    user: "ekangafrique@gmail.com",
    pass: "ekang2020*"
  }
});
admin.initializeApp();

exports.sendChatEmail = functions.https.onCall((data, context) => {
  console.log(data);

  var text = `<div>
  <h4>EKANG CHAT NOTIFICATION</h4>
  <ul>
    <li>
      Name - ${data.name || ""}
    </li>
    <li>
      Email - ${data.email || ""}
    </li>
   
  </ul>
  <h4>Message</h4>
  <p>${data.name ||
    ""} vous avez reçu un message! connecter vous a votre compte</p>
</div>`;
  const mailOptions = {
    from: "no-reply@myemail.com",
    to: data.email,
    subject: `${data.name} sent you a new chat notification`,
    text: text,
    html: text
  };

  return transporter.sendMail(mailOptions);
  /* return transporter
    .sendMail(mailOptions)
    .then(data => {
      console.log(data);

      return data;
    })
    .catch(err => {
      return err;
    });*/
  /*  return admin
    .auth()
    .getUserByEmail(data.email)
    .then(user => {
      var text = `<div>
        <h4>EKANG CHAT NOTIFICATION</h4>
        <ul>
          <li>
            Name - ${data.name || ""}
          </li>
          <li>
            Email - ${data.email || ""}
          </li>
         
        </ul>
        <h4>Message</h4>
        <p>${message || ""}</p>
      </div>`;
      const mailOptions = {
        bcc: data.email,
        from: "no-reply@myemail.com",
        subject: `${data.name} sent you a new chat notification`,
        text: text,
        html: text
      };
      transporter
        .sendMail(mailOptions)
        .then(() => {
          return { message: "mail send!" };
        })
        .catch(err => {
          return err;
        });
    });*/
});
