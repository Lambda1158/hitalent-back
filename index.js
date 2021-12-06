const server = require("./src/app.js");
const {
  conn,
  Users,
  Posts,
  Categories,
  Review,
  Orders,
  Favorites,
  Payments,
  Question,
} = require("./src/db.js");
const bcrypt = require("bcrypt");

// Syncing all the models at once.
conn.sync({ force: true }).then(() => {
  server.listen(3001, async () => {
    Categories.bulkCreate([
      { title: "Programación y Tecnologias" },
      { title: "Arte" },
      { title: "Botánica" },
      { title: "Cocina" },
      { title: "Negocios" },
      { title: "Deporte" },
      { title: "Música y Audio" },
      { title: "Ilustración, Video y Fotografia" },
      { title: "Marketing" },
      { title: "Escritura y Traducción" },
      { title: "Idioma" },
      { title: "Baile" },
      { title: "Historia y Cultura" },
    ])
      .then((e) => {})
      .catch((e) => console.log(e));
    //------------------------------------------------------------------------------
    var testpost1 = await Posts.create({
      //creo post 1
      title: "Canto",
      description:
        "Me dedico a enseñar las técnicas vocales básicas para controlar su voz y desarrollar su interpretación vocal. Las técnicas de canto también incluyen la dicción y la pronunciación de las vocales, sobre todo, la entonación de frases.",
      cost: 500,
      image: [
        "https://cdn.hobbyconsolas.com/sites/navi.axelspringer.es/public/styles/1200/public/media/image/2020/05/cantar-1955117.jpg?itok=fCPDYcVi",
      ],
    });
    var testpost2 = await Posts.create({
      //creo post 2
      title: "Guitarra",
      description:
        "Conocimiento del instrumento, colocacion de las manos, partes de la guitarra, afinación, nombre de las notas al aire,tipos de acordes, riff basados en canciones que les gusten, escalitas sencillas, tecnicas de guitarras, ligados, picking, alternate, tapping.",
      cost: 790,
      image: [
        "https://www.superprof.com.ar/blog/wp-content/uploads/2020/03/aprender-guitarra-principiante-1060x704.jpg",
      ],
    });

    var password = "123abc";
    var passwordHash = await bcrypt.hash(password, 10);

    var testuser1 = await Users.create({
      //creo usuario test1
      name: "Franco",
      lastName: "Benitez",
      username: "franco.benitez",
      password: passwordHash,
      birthdate: "2016-06-21",
      email: "franco.benitez@gmail.com",
      country: "Bolivia",
    });

    await testpost1.setUser(testuser1); //le vinculo los 2 post al usuario test
    await testpost2.setUser(testuser1);

    var testorden = await Orders.create({}); // creo una orden vacia
    await testorden.setUser(testuser1); //le vinculo un usuario
    await testorden.setPost(testpost2); // le vinculo un post

    //console.log(testorden.toJSON()) //la muestro y anda C:

    //-------------------------------------------------------------------------

    var testpayment = await Payments.create({
      //creo un medio de pago
      name: "visa",
      number: "522154869522",
      code: 160,
    });
    await testorden.setPayment(testpayment); //lo seteo a la orden de pago

    //console.log(testorden.toJSON())   //lo muestro , deberia estar bindeado al usuario?????

    //--------------------------------------------------------------------------
    var testuser3 = await Users.create({
      //usuario test 3
      name: "Hernan",
      lastName: "Lopez",
      username: "hernan_lopez",
      password: passwordHash,
      birthdate: "1994-10-10",
      email: "hernan_lopez@gmail.com",
      country: "Uruguay",
    });
    var testfavoritos1 = await Favorites.create({
      //una lista favoritos
      description: "favoritos de hernan",
    });
    var testfavoritos2 = await Favorites.create({
      description: "favoritos de hernan publicacion 2",
    }); //lista  favoritos 2
    await testfavoritos2.setUser(testuser3);
    await testfavoritos2.setPost(testpost2); //les bindeo un usuario y un post a cada lista favorito
    await testfavoritos1.setUser(testuser3);
    await testfavoritos1.setPost(testpost1);
    //console.log(testfavoritos2.toJSON())
    let aux = await Favorites.findAll({ raw: true }); //busco todo lo de la tabla favoritos
    //console.log(aux)  //las muestro

    //-----------------------------------------------
    var testquestion = await Question.create({
      //creo una pregunta
      title: "titulo de la pregunta",
      question: "probando pregunta??????",
    });
    await testquestion.setUser(testuser3); //la bindeo a un usuario , q seria quien la pregunto
    //console.log(testquestion.toJSON()) //la muestro
    testquestion.answer = "la respondo";
    testquestion.save();
    //console.log(testquestion.toJSON())

    var userToDelete = await Users.create({
      //test delete
      id: "f30e3325-2dbe-4bd3-82a4-d9e827380f20",
      name: "Micaela",
      lastName: "Garcia",
      username: "mica-garcia",
      password: passwordHash,
      email: "mica-garcia@gmail.com",
      country: "Chile",
    });

    //Testeo todo lo que necesita el profile de usuario: informacion, publicaciones, Q&A, reseñas...

    var testUserProfile = await Users.create({
      //usuario test 3
      name: "Santiago",
      lastName: "Alvarez",
      username: "santi_alvarez",
      password: passwordHash,
      birthdate: "2000-10-10",
      email: "santi_alvarez@gmail.com",
      country: "Argentina",
    });

    var testPostProfile1 = await Posts.create({
      //creo post 1
      title: "Desarrollo Web",
      description:
        "Convertite en Full Stack developer con entrenamientos intensivos en el que vas a aprender de computación y desarrollo web desde el principio hasta el final.",
      cost: 500,
      image: [
        "https://cdn.domestika.org/c_limit,dpr_auto,f_auto,q_auto,w_820/v1566492620/content-items/003/212/919/2-original.png?1566492620",
      ],
    });
    var testPostProfile2 = await Posts.create({
      //creo post 1
      title: "Meditación",
      description:
        "Técnicas de relajación y conexión con nuestro lado inconsciente muy positiva para tratar diferentes problemas de ansiedad, miedos o estrés.",
      cost: 980,
      image: [
        "https://images-ext-1.discordapp.net/external/HI1Ac92dYdKO1WGZO18Up6geo4F9VG1apGPU1f7TfMg/https/t1.pb.ltmcdn.com/es/posts/5/4/1/pasos_para_aprender_a_meditar_en_casa_4145_orig.jpg?width=730&height=438",
      ],
    });
    await testPostProfile1.setUser(testUserProfile); //le vinculo los 2 post al usuario test
    await testPostProfile2.setUser(testUserProfile);

    // var testorden=await Orders.create({}) // creo una orden vacia
    // await testorden.setUser(testuser1) //le vinculo un usuario
    // await testorden.setPost(testpost2) // le vinculo un post

    var testReviewProfile1 = await Review.create({
      rating: 4,
      description: "Muy bueno",
    });

    await testReviewProfile1.setUser(testuser3); //le vinculo los 2 post al usuario test
    await testReviewProfile1.setPost(testPostProfile1);

    var testReviewProfile2 = await Review.create({
      rating: 1,
      description: "No me gusto la explicacion",
    });

    await testReviewProfile2.setUser(testuser1);
    await testReviewProfile2.setPost(testPostProfile2);

    var testQuestionProfile = await Question.create({
      //creo una pregunta
      title: "Titulo de la pregunta",
      question: "Recibis mercado pago??",
    });
    await testQuestionProfile.setUser(testuser1);
    await testQuestionProfile.setPost(testPostProfile2);

    testQuestionProfile.answer = "Si, recibo mercado pago";
    testQuestionProfile.save();

    var testQuestionProfile2 = await Question.create({
      //creo una pregunta
      title: "Horarios",
      question: "Hola, queria saber si das este curso por la mañana",
    });
    await testQuestionProfile2.setUser(testUserProfile2);
    await testQuestionProfile2.setPost(testPostProfile2);

    //USUARIO 4---------------------------------------------------------------

    var testUserProfile2 = await Users.create({
      name: "Agustina",
      lastName: "Gonzalez",
      username: "agus1gonzalez",
      password: passwordHash,
      birthdate: "2000-10-10",
      email: "agus1gonzalez@gmail.com",
      country: "Brasil",
    });

    var testPostProfile3 = await Posts.create({
      title: "Botánica",
      description: "Les explicaré como hacer un correcto cultivo de vegetales",
      cost: 230,
      image: [
        "https://cdn.euroinnova.edu.es/img/subidasEditor/fotolia_104339124_subscription_xxl-1611919696.webp",
      ],
    });
    await testPostProfile3.setUser(testUserProfile2);

    var testReviewProfile3 = await Review.create({
      rating: 5,
      description: "Gracias a este curso pude crear mi propia huerta",
    });

    await testReviewProfile3.setUser(testUserProfile2);
    await testReviewProfile3.setPost(testPostProfile3);

    var testQuestionProfile1 = await Question.create({
      title: "Tipo de vegetales",
      question:
        "Hola, queria saber si explicas el cultivo de zanahorias en tu curso",
    });
    await testQuestionProfile1.setUser(testuser1);
    await testQuestionProfile1.setPost(testPostProfile3);

    testQuestionProfile1.answer =
      "Hola Franco, si, mi curso contempla esa explicación";
    testQuestionProfile1.save();

    //USUARIO 5---------------------------------
    var testUserProfile3 = await Users.create({
      name: "Ricardo",
      lastName: "Contreras",
      username: "ricky123",
      password: passwordHash,
      birthdate: "2000-10-10",
      email: "ricky123@gmail.com",
      country: "Argentina",
    });

    var testPostProfile4 = await Posts.create({
      title: "Plomeria",
      description:
        " Aprenderás sobre reparaciones e instalación de equipos sanitarios, tuberías de gas o agua como también los equipos y herramientas esenciales para problemas comunes",
      cost: 300,
      image: [
        "https://casapropiacolombia.com/sites/default/files/2019-12/11_0.jpg",
      ],
    });
    await testPostProfile4.setUser(testUserProfile3);

    console.log("%s listening at 3001 ahi va!!!!"); // eslint-disable-line no-console
  });
});
