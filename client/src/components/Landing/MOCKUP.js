const reseña1 = {
    user:{
        username : "Franco Benitez",
        calificacion : 4,
        reseña : "Buen tiempo de entrega, la verdad me resolvio todos mis problemas.",
        curso: {
            imagen: "https://www.educaciontrespuntocero.com/wp-content/uploads/2019/10/music-978x652.jpg",
            categoria: "Musica",
        }
        }
    };

const reseña2 = {
    user:{
        username : "Hernan Lopez ",
        calificacion : 5,
        reseña : "Excelente plataforma, aprendi a tocar la guitarra gracias a los cursos, y tuve la oportunidad de enseñar y transmitir mi pasion por la botanica",
        curso: {
            imagen: "https://media.admagazine.com/photos/618a6acbcc7069ed5077ca7f/master/w_1600%2Cc_limit/68704.jpg",
            categoria: "Arte",
        }
        }
    };

const reseña3 = {
    user:{
        username : "Santiago Alvarez",
        calificacion : 5,
        reseña : "Excelente, me encanto la atencion, fue lo mejor que me paso haber contratado a alguien tan talentoso para cumplir mi meta!",
        curso: {
            imagen: "https://www.uncommunitymanager.es/wp-content/uploads/seo_google_youtube.jpg",
            categoria: "Video",
        }
        }
    };


var RESEÑAS = [reseña1, reseña2, reseña3];

export default RESEÑAS;