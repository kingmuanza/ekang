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
    from: "no-reply@ekangAfrique@gmail.com",
    to: data.email,
    subject: `${data.name} sent you a new chat notification`,
    text: text,
    html: text
  };

  return transporter.sendMail(mailOptions);
});

exports.sendCommentaireEmail = functions.https.onCall((data, context) => {
  console.log(data.tabMails.join());

  if (data.auteur == data.nom) {
    console.log("auteur commentateur");
  } else {
  }
  var text = `<div>
  <h4>EKANG COMMENTAIRES NOTIFICATION</h4>
 
  <h4>Message</h4>
  <p>${data.nom || ""} a repondu a votre commentaire sur la publication ${
    data.auteur
  }</p>
</div>`;
  const mailOptions = {
    from: "no-reply@ekangAfrique@gmail.com",
    to: data.tabMails.join(),
    subject: `${data.nom} nouveau commentaire`,
    text: text,
    html: text
  };

  return transporter.sendMail(mailOptions);
});
