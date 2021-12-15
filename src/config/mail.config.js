const nodemailer = require("nodemailer");
const { HOST, USER, PASSWORD } = process.env;

const mail = {
  user: USER,
  pass: PASSWORD,
};

let transporter = nodemailer.createTransport({
  host: HOST,
  port: 465,
  tls: {
    rejectUnauthorized: false,
  },
  secure: true, // true for 465, false for other ports
  auth: {
    user: mail.user, // generated ethereal user
    pass: mail.pass, // generated ethereal password
  },
});

//---------PARA VERIFICAR EMAIL-----------

const sendEmail = async (email, subject, html) => {
  try {
    // send mail with defined transport object
    await transporter.sendMail({
      from: '"hiTalent 👻" <hiTalent@comunity.com>', // sender address
      to: email, // list of receivers
      subject, // Subject line
      text: "Hola, bienvenidos a la comunidad de hiTalent", // plain text body
      html, // html body
    });
  } catch (error) {
    console.log("Algo no va bien con el email", error);
  }
};

const getTemplate = (name, token) => {
  return `
      <head>
          <link rel="stylesheet" href="./style.css">
      </head>
      
      <div id="email___content">
          <h2>Hola ${name}</h2>
          <img src="https://media1.giphy.com/media/xUPGGDNsLvqsBOhuU0/giphy.gif?cid=ecf05e47ke716v2cux6xhdzu346d98wutrc5xw6x9lzpgjzc&rid=giphy.gif&ct=g" alt="">
          <p>Para confirmar tu cuenta, ingresa al siguiente enlace</p>
          <a
              href="http://localhost:3000/user/confirm/${token}"
              target="_blank"
          >Confirmar Cuenta</a>
      </div>
    `;
};

//----------PARA RESTABLECER CONTRASEÑA------------

const sendEmailPassword = async (email, subject, html) => {
  try {
    // send mail with defined transport object
    await transporter.sendMail({
      from: '"hiTalent 👻" <hiTalent@comunity.com>', // sender address
      to: email, // list of receivers
      subject, // Subject line
      text: "Recuperación de contraseña", // plain text body
      html, // html body
    });
  } catch (error) {
    console.log("Algo no va bien con el email", error);
  }
};

const getTemplatePassword = () => {
  return `
      <head>
          <link rel="stylesheet" href="./style.css">
      </head>
      
      <div id="email___content">
          <p>Hola! Recientemente has solicitado restablecer tu contraseña.
          Hacé <a href="http://localhost:3000/user/resetpassword" target="_blank">clic acá</a>
          para restablercerla.</p>
      </div>
    `;
};

//------------------USUARIO APROBADO-------------------------

const sendEmailUserApproved = async (email, subject, html) => {
  try {
    // send mail with defined transport object
    await transporter.sendMail({
      from: '"hiTalent 👻" <hiTalent@comunity.com>', // sender address
      to: email, // list of receivers
      subject, // Subject line
      text: "¡Felicitaciones!¡Usuario aprobado con éxito!", // plain text body
      html, // html body
    });
  } catch (error) {
    console.log("Algo no va bien con el user", error);
  }
};

const getTemplateUserApproved = () => {
  return `
      <head>
          <link rel="stylesheet" href="./style.css">
      </head>
      
      <div id="email___content">
          <img src="https://codes.unidepix.com/img/hi.png" alt="">
          <p>¡Hola! ¡Esperamos te encuentres muy bien!
          <br />
          <br />
          <p> Has cumplido con todos los requisitos de registro y por eso tu perfil está aprobado.</p>
          <br />
          <br />
          <p>¡Saludos!.</p>
          <p>El equipo de hiTalent.</p>
      </div>
    `;
};
//------------------USUARIO NO APROBADO-------------------------

const sendEmailUserDisapproved = async (email, subject, html) => {
  try {
    // send mail with defined transport object
    await transporter.sendMail({
      from: '"hiTalent 👻" <hiTalent@comunity.com>', // sender address
      to: email, // list of receivers
      subject, // Subject line
      text: "Tu usuario aún no fue aprobado", // plain text body
      html, // html body
    });
  } catch (error) {
    console.log("Algo no va bien con el user", error);
  }
};

const getTemplateUserDisapproved = () => {
  return `
      <head>
          <link rel="stylesheet" href="./style.css">
      </head>
      
      <div id="email___content">
          <img src="https://codes.unidepix.com/img/hi.png" alt="">
          <p>¡Hola! ¡Esperamos te encuentres muy bien!
          <br />
          <br />
          <p>No has cumplido con todos los requisitos de registro, por favor intenta de nuevo.</p>
          <br />
          <br />
          <p>¡Saludos!.</p>
          <p>El equipo de hiTalent.</p>
      </div>
    `;
};

//------------------RESEÑA NO APROBADA-------------------------
const sendEmailReviewDestroy = async (email, subject, html) => {
  try {
    // send mail with defined transport object
    await transporter.sendMail({
      from: '"hiTalent 👻" <hiTalent@comunity.com>', // sender address
      to: email, // list of receivers
      subject, // Subject line
      text: "Tu reseña fue eliminada", // plain text body
      html, // html body
    });
  } catch (error) {
    console.log("Algo no va bien con la review destroy", error);
  }
};

const getTemplateReviewDestroy = () => {
  return `
      <head>
          <link rel="stylesheet" href="./style.css">
      </head>
      
      <div id="email___content">
          <img src="https://codes.unidepix.com/img/hi.png" alt="">
          <p>¡Hola! ¡Esperamos te encuentres muy bien!
          <br />
          <br />
          <p>Hemos eliminado tu reseña porque no cumple con las normas de nuestro sitio.</p>
          <br />
          <br />
          <p>¡Saludos!.</p>
          <p>El equipo de hiTalent.</p>
      </div>
    `;
};
//------------------PUBLICACION NO APROBADA-------------------------

const sendEmailPostDestroy = async (email, subject, html) => {
  try {
    // send mail with defined transport object
    await transporter.sendMail({
      from: '"hiTalent 👻" <hiTalent@comunity.com>', // sender address
      to: email, // list of receivers
      subject, // Subject line
      text: "Tu publicación fue eliminada", // plain text body
      html, // html body
    });
  } catch (error) {
    console.log("Algo no va bien con el user", error);
  }
};

const getTemplatePostDestroy = () => {
  return `
      <head>
          <link rel="stylesheet" href="./style.css">
      </head>
      
      <div id="email___content">
          <img src="https://codes.unidepix.com/img/hi.png" alt="">
          <p>¡Hola! ¡Esperamos te encuentres muy bien!
          <br />
          <br />
          <p>Hemos eliminado tu publicación porque no cumple con las normas de nuestro sitio.</p>
          <br />
          <br />
          <p>¡Saludos!.</p>
          <p>El equipo de hiTalent.</p>
      </div>
    `;
};

module.exports = {
  sendEmail,
  getTemplate,
  sendEmailPassword,
  getTemplatePassword,
  sendEmailUserApproved,
  getTemplateUserApproved,
  sendEmailUserDisapproved,
  getTemplateUserDisapproved,
  sendEmailReviewDestroy,
  getTemplateReviewDestroy,
  sendEmailPostDestroy,
  getTemplatePostDestroy,
};
