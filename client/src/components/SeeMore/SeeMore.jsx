import React, { useEffect } from "react";
import { PROXY } from '../../actions';
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { getTalentById } from "../../actions";
import Nav from "../Home/Nav";
import Footer from "../Landing/Footer";
import { Link } from "react-router-dom";
import { Box, useToast, Button, Image } from "@chakra-ui/react";
// import { StarIcon } from "@chakra-ui/icons";
import QyA from "./Q&A";
import QyAanswer from "./Q&Aanswer";
import Reviews from "./Reviews";
import axios from "axios";

export default function SeeMore() {
  const toast = useToast();
  const dispatch = useDispatch();
  const { id } = useParams();
  const seemore = useSelector((state) => state.index.moreTalent);

  useEffect(() => {
    dispatch(getTalentById(id));
  }, [dispatch, id]);

  let mercadopago = { title: seemore.title, total: seemore.cost };

  async function handleCheckOut(e) {
    console.log(mercadopago);
    e.preventDefault();
    let response = await axios.post(
      `${PROXY}/checkout/mercadopago/`,
      mercadopago
    );
    console.log(response);
    window.location.href = response.data.init_points;
  }

  return (
    <div className="seemore">
      <Nav />
      {seemore ? (
        <Box
          m="auto"
          mt="2"
          mb="2"
          maxW="lg"
          maxH="80em"
          borderWidth="2px"
          borderRadius="lg"
          overflow="hidden"
        >
          <Image src={seemore.image} alt="talent_image" />

          <Box p="6">
            <Box display="flex" alignItems="baseline">
              <Box
                color="gray.500"
                fontWeight="semibold"
                letterSpacing="wide"
                fontSize="xs"
                textTransform="uppercase"
                ml="2"
              >
                {/* By: {seemore.user.username} */}
              </Box>
            </Box>

            <Box
              mt="2"
              fontWeight="semibold"
              as="h4"
              lineHeight="tight"
              fontSize="25"
              isTruncated
            >
              {seemore.title}
            </Box>

            <Box>{seemore.description}</Box>

            <Box>
              <Box as="span" color="gray.600" fontSize="sm">
                $
              </Box>
              {seemore.cost}
            </Box>

            {/* <Box display='flex' mt='2' alignItems='center'>
      {Array(5)
        .fill('')
        .map((_, i) => (
          <StarIcon
          key={i}
          color={i < seemore.rating ? 'teal.500' : 'gray.300'}
          />
          ))}
      <Box as='span' ml='2' color='gray.600' fontSize='sm'>
        {seemore.reviewCount} reviews
      </Box>
    </Box> */}
            <Box class="flex flex-col items-center" m="2">
              <Button onClick={(e) => handleCheckOut(e)}>Comprar</Button>
              <Box as="span" m="2" color="gray.600" fontSize="sm">
                <Button
                  onClick={() =>
                    toast({
                      position: "bottom-right",
                      render: () => (
                        <Box color="white" p={3} bg="green.500">
                          Agregado al carrito
                        </Box>
                      ),
                    })
                  }
                >
                  Agregar al carrito
                </Button>
              </Box>
            </Box>
          </Box>
          <QyAanswer />
          <QyA />
          <Reviews />
          <Box>
            <Link to="/home">
              <Button m="2">Volver</Button>
            </Link>
          </Box>
        </Box>
      ) : (
        <p>Cargando</p>
      )}
      <Footer />
    </div>
  );
}
