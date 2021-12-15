const server = require("./src/app.js");
const PORT=process.env.PORT||3001
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
  Message,
  Conversation,
} = require("./src/db.js");
const bcrypt = require("bcrypt");

// Syncing all the models at once.
conn.sync({ force: true }).then(() => {
  server.listen(PORT, async () => {
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
      { title: "Educación" },
      { title: "Mantenimiento del hogar" },
      { title: "Meditación" },
    ])
      .then((e) => {})
      .catch((e) => console.log(e));

      var password = "123abc";
      var passwordHash = await bcrypt.hash(password, 10);
    //------------------------------------------------------------------------------------
    async function calcularRating(post,review){
      if(post.rating===0){
        post.rating=Number(review.qualification)
        await post.save()
        return post
      }
      post.rating=Number(Math.round((post.rating+Number(review.qualification))/2))
      await post.save()
    }
    //------------------------------------USUARIOS------------------------------------------

    var usuarioPrueba = await Users.create({
      name: "Admin",
      lastName: "Hitalent",
      username: "admin",
      password: passwordHash,
      aprobado: true,
      email: "admin@gmail.com",
      email_verified: true,
      isAdmin: true,
    });

    var usuarioPrueba = await Users.create({
      name: "Bruno",
      lastName: "Herrera",
      username: "bruno_herrera",
      password: passwordHash,
      birthdate: "1994-10-10",
      email: "brunoherrera@gmail.com",
      country: "Rusia",
      aprobado:false,
      email_verified:true
    });
    var usuarioPrueba2 = await Users.create({
      name: "Martina",
      lastName: "Pipi",
      username: "martina_pipi",
      password: passwordHash,
      birthdate: "1994-10-10",
      email: "martinapipi@gmail.com",
      country: "Corea",
      aprobado:false,
      email_verified:true
    });
    var usuarioPrueba3 = await Users.create({
      name: "Cristian",
      lastName: "Albornoz",
      username: "facilito",
      password: passwordHash,
      birthdate: "1994-10-10",
      email: "facilito@gmail.com",
      country: "NewYorkCity",
      aprobado:true,
      email_verified:true
    });
    var usuarioPrueba4 = await Users.create({
      name: "Sebastian",
      lastName: "Cepeda",
      username: "sacout",
      password: passwordHash,
      birthdate: "1994-10-10",
      email: "sacout@gmail.com",
      country: "NewYorkCity",
      aprobado:true,
      email_verified:true
    });
    var testuser1 = await Users.create({
      //creo usuario test1
      name: "Franco",
      lastName: "Benitez",
      username: "franco.benitez",
      password: passwordHash,
      birthdate: "2016-06-21",
      email: "franco.benitez@gmail.com",
      country: "Bolivia",
      aprobado:true,
      email_verified:true
    });
    var testuser3 = await Users.create({
      //usuario test 3
      name: "Hernan",
      lastName: "Lopez",
      username: "hernan_lopez",
      password: passwordHash,
      birthdate: "1994-10-10",
      email: "hernan_lopez@gmail.com",
      country: "Uruguay",
      aprobado:true,
      email_verified:true
    });
    var testUserProfile2 = await Users.create({
      name: "Agustina",
      lastName: "Gonzalez",
      username: "agus1gonzalez",
      password: passwordHash,
      birthdate: "2000-10-10",
      email: "agus1gonzalez@gmail.com",
      country: "Brasil",
      aprobado:true,
      email_verified:true
    });
    var testUserProfile = await Users.create({
      //usuario test 3
      name: "Santiago",
      lastName: "Alvarez",
      username: "santi_alvarez",
      password: passwordHash,
      birthdate: "2000-10-10",
      email: "santi_alvarez@gmail.com",
      country: "Argentina",
      aprobado:true,
      email_verified:true
    });
    var userToDelete = await Users.create({
      //test delete
      id: "f30e3325-2dbe-4bd3-82a4-d9e827380f20",
      name: "Micaela",
      lastName: "Garcia",
      username: "mica-garcia",
      password: passwordHash,
      email: "mica-garcia@gmail.com",
      country: "Chile",
      aprobado:true,
      email_verified:true
    });
    var testUserProfile3 = await Users.create({
      name: "Ricardo",
      lastName: "Contreras",
      username: "ricky123",
      password: passwordHash,
      birthdate: "2000-10-10",
      email: "ricky123@gmail.com",
      country: "Argentina",
      aprobado:true,
      email_verified:true
    });



    //------------------------------------PUBLICACIONES-------------------------------------------------------------------------

    var testpost1 = await Posts.create({
      //creo post 1
      title: "Canto",
      description:
        "Me dedico a enseñar las técnicas vocales básicas para controlar su voz y desarrollar su interpretación vocal. Las técnicas de canto también incluyen la dicción y la pronunciación de las vocales, sobre todo, la entonación de frases.",
      cost: 500,
      image: [
        "https://cdn.hobbyconsolas.com/sites/navi.axelspringer.es/public/styles/1200/public/media/image/2020/05/cantar-1955117.jpg?itok=fCPDYcVi",
      ],
      timeZone: " GMT-3",
      language: " español"
    });
    await testpost1.setCategory(7)//Le agrego musica y audio de categoria al post canto testpost1
    await testpost1.setUser(testuser1); //Clase de canto testpost1

    var testpost2 = await Posts.create({
      //creo post 2
      title: "Guitarra",
      description:
        "Conocimiento del instrumento, colocacion de las manos, partes de la guitarra, afinación, nombre de las notas al aire, tipos de acordes, riff basados en canciones que les gusten, escalitas sencillas, técnicas de guitarras, ligados, picking, tapping.",
      cost: 790,
      image: [
        "https://www.superprof.com.ar/blog/wp-content/uploads/2020/03/aprender-guitarra-principiante-1060x704.jpg",
      ],
      timeZone: " GMT-6",
      language: " español"
    });
    await testpost1.setCategory(7)//Le agrego musica y audio de categoria al post Guitarra testpost2
    await testpost2.setUser(testuser1);//Franco Bennitez crea el post clase de canto

    var testPostProfile3 = await Posts.create({
      title: "Clases de Cultivos",
      description: "Les explicaré como hacer un correcto cultivo de vegetales y asi podras obtener las mejores frutas y verduras en tu propia casa",
      cost: 230,
      image: [
        "https://cdn.euroinnova.edu.es/img/subidasEditor/fotolia_104339124_subscription_xxl-1611919696.webp",
      ],
      timeZone: " GMT-3",
      language: " español"
    });
    await testPostProfile3.setCategory(3)//le agrego la categoria Botanica a el post clases de cultivos
    await testPostProfile3.setUser(testUserProfile2);//Agustina Gonzales crea un post de clases de cultivos testUserProfile2

    var testPostProfile1 = await Posts.create({
      //creo post 1
      title: "Desarrollo Web",
      description:
        "Convertite en Full Stack developer con entrenamientos intensivos en el que vas a aprender de computación y desarrollo web desde el principio hasta el final.",
      cost: 500,
      image: [
        "https://cdn.domestika.org/c_limit,dpr_auto,f_auto,q_auto,w_820/v1566492620/content-items/003/212/919/2-original.png?1566492620",
      ],
      timeZone: " GMT-3",
      language: " español"
    });
    await testPostProfile1.setCategory(1)//Le agrego la categoria Programacion y tecnologia al post Desarrollo web testpostprifile1
    await testPostProfile1.setUser(testUserProfile); //El usuario Santiago alvarez crea el post desarrolo web

    var testPostProfile2 = await Posts.create({
      //creo post 1
      title: "Yoga",
      description:
        "Técnicas y ejercicios de relajación y conexión con nuestro lado inconsciente, muy positiva para tratar diferentes problemas de ansiedad, miedos o estrés.",
      cost: 980,
      image: [
        "https://images-ext-1.discordapp.net/external/HI1Ac92dYdKO1WGZO18Up6geo4F9VG1apGPU1f7TfMg/https/t1.pb.ltmcdn.com/es/posts/5/4/1/pasos_para_aprender_a_meditar_en_casa_4145_orig.jpg?width=730&height=438",
      ],
      timeZone: " GMT-5",
      language: " español"
    });
    await testPostProfile2.setCategory(16)//Le agrego  la categoria Meditación a el post yoga testpostprofile2
    await testPostProfile2.setUser(testUserProfile);// El usuario Santiago alvarez crea el post Yoga

    var testPostProfile4 = await Posts.create({
      title: "Plomeria",
      description:
        " Aprenderás sobre reparaciones e instalación de equipos sanitarios, tuberías de gas o agua como también los equipos y herramientas esenciales para problemas comunes",
      cost: 300,
      image: [
        "https://casapropiacolombia.com/sites/default/files/2019-12/11_0.jpg",
      ],
      timeZone: " GMT-6",
      language: " español"
    });
    await testPostProfile4.setCategory(15)//Le asigno la categoria de mantenimiento del hogar al post testpostprofile4
    await testPostProfile4.setUser(testUserProfile3);//Post plomeria creado por Ricardo Cortez


    //-------------------------------------------------------FAVORITOS------------------------------------------------------------------------
    var testfavoritos1 = await Favorites.create({
      //una lista favoritos
      description: "favoritos de hernan",
    });
    await testfavoritos1.setUser(testuser3);
    await testfavoritos1.setPost(testpost1);

    var testfavoritos2 = await Favorites.create({
      description: "favoritos de hernan publicacion 2",
    }); //lista  favoritos 2
    await testfavoritos2.setUser(testuser3);
    await testfavoritos2.setPost(testpost2); //les bindeo un usuario y un post a cada lista favorito
    


    
    
    //-----------------------------------------------  REVIEWS-------------------------------------------------------------------------------
    var testReviewProfile1 = await Review.create({
      qualification: 4,
      description: "Muy bueno",
    });
    await testReviewProfile1.setUser(testuser3); //Hernan lopez crea una review testReviewprofile1
    await testReviewProfile1.setPost(testPostProfile1);//La crea sobre el post Desarrolo web
    calcularRating(testPostProfile1,testReviewProfile1)

    var reviewSebaporYoga=await Review.create({
      qualification:1,
      description:"no estaba op"
    })
    await reviewSebaporYoga.setUser(usuarioPrueba4)//Sebastian Cepeda crea una review usuarioPrueba4
    await reviewSebaporYoga.setPost(testPostProfile2)//La crea sobre el post Yoga testPostProfile2
    calcularRating(testPostProfile2,reviewSebaporYoga)

    var reviewCristianporYoga=await Review.create({
      qualification:5,
      description:"Me encanto la clase C:"
    })
    await reviewCristianporYoga.setUser(usuarioPrueba3)//Cristian Alvornoz crea una review usuarioPrueba3
    await reviewCristianporYoga.setPost(testPostProfile2)//La crea sobre el post Yoga testPostProfile2
    calcularRating(testPostProfile2,reviewCristianporYoga)

    var testReviewProfile2 = await Review.create({
      qualification: 1,
      description: "No me gusto la explicacion",
    });
    await testReviewProfile2.setUser(testuser1);//Franco Benitez deja una review testuser1
    await testReviewProfile2.setPost(testPostProfile2);//La crea sobre post yoga
    calcularRating(testPostProfile2,testReviewProfile2)

    var testReviewProfile3 = await Review.create({
      qualification: 5,
      description: "Gracias a este curso pude crear mi propia huerta",
    });
    await testReviewProfile3.setUser(usuarioPrueba4);//Sebastian Cepeda hace una review sobre el post q compro
    await testReviewProfile3.setPost(testPostProfile3);//EL post sobre el q se hizo la review Clases de cultivos
    calcularRating(testPostProfile3,testReviewProfile3)

    //----------------------------------------------- QUESTIONS---------------------------------------------------------------------
    var testQuestionProfile = await Question.create({
      //creo una pregunta
      title: "Titulo de la pregunta",
      question: "Recibis mercado pago??",
    });
    await testQuestionProfile.setUser(testuser1);//Franco Benitez crea un apregunta testuser1
    await testQuestionProfile.setPost(testPostProfile2);// La crea sobre el post yoga

    testQuestionProfile.answer = "Si, recibo mercado pago";
    testQuestionProfile.save();

    var testQuestionProfile2 = await Question.create({
      //creo una pregunta
      title: "Horarios",
      question: "Hola, queria saber si das este curso por la mañana",
    });
    await testQuestionProfile2.setUser(testUserProfile2);
    await testQuestionProfile2.setPost(testPostProfile2);


    var testQuestionProfile1 = await Question.create({
      title: "Tipo de vegetales",
      question:
        "Hola, queria saber si explicas el cultivo de zanahorias en tu curso",
    });
    await testQuestionProfile1.setUser(testuser1);
    await testQuestionProfile1.setPost(testPostProfile3);

    testQuestionProfile1.answer ="Hola Franco, si, mi curso contempla esa explicación";
    testQuestionProfile1.save();
    //----------------------------------------------- ORDENES------------------------------------------------------------------------
      var ordenSebaCultivos=await Orders.create({
        title:"Orden de Sebastian sobre cultivos",
        price:500
      })
      await ordenSebaCultivos.setUser(usuarioPrueba4) //Orden de compra de sebastian 
      await ordenSebaCultivos.setPost(testPostProfile3)// Sobre post de cultivos

      var ordenHernanGuitarra = await Orders.create({
        title:"orden de compra de  Hernan a clase de guitarra",
        price:790
      }); // creo una orden vacia
      await ordenHernanGuitarra.setUser(testuser3); //Orden a nombre de Hernan Lopez q es testuser3
      await ordenHernanGuitarra.setPost(testpost2); // Compro clases de Guitarra testpost2

      var ordenFrancoYoga=await Orders.create({
        title:"orden de compra de Franco a la clase Yoga",
        price:200
      })
      await ordenFrancoYoga.setUser(testuser1)//Orden de compra para Franco q es testuser1
      await ordenFrancoYoga.setPost(testPostProfile2)//Compro clases de Yoga testpostprofile2

      var ordenSebastianYoga=await Orders.create({
        title:"Orden de compra de Sebastian a la clase de Yoga",
        price:123
      })
      await ordenSebastianYoga.setUser(usuarioPrueba4)//Orden de compra para Sebastian q es usuarioPrueba4
      await ordenSebastianYoga.setPost(testPostProfile2)//Compro clases de yoga testPostProfile2

      var ordenSebastianYoga=await Orders.create({
        title:"Orden de compra de Cristian alias el gran FACILITO a la clase de Yoga",
        price:666
      })
      await ordenSebastianYoga.setUser(usuarioPrueba3)//Orden de compra para el FACILITO q es usuarioPrueba3
      await ordenSebastianYoga.setPost(testPostProfile2)//Compro clases de yoga testPostProfile2

    //PROBANDO CHAT-----------------------
    let conversation1 = await Conversation.create({
      members: [testUserProfile.id, testUserProfile3.id],
    });
    await Message.create({
      conversationId: conversation1.id,
      sender: testUserProfile.id,
      text: "Hola Ricardo",
    });

    await Message.create({
      conversationId: conversation1.id,
      sender: testUserProfile3.id,
      text: "Hola Santi",
    });

    console.log("%s listening at 3001 ahi va!!!!"); // eslint-disable-line no-console
  });
});
