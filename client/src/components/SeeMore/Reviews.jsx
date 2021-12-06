import React from "react";
import { Box } from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";
import { useSelector } from "react-redux";

export default function Reviews() {
    const seemore = useSelector((state) => state.index.moreTalent)
    return (
        <div class="m-3">
            <h3 class="text-xl font-semibold">Reviews del talento</h3> <hr />
            {
                seemore.reviews
                ?
                (<Box display='flex' mt='2' alignItems='center'>
                {
                seemore?.reviews
                .map((e) => (
                    <StarIcon
                    key={e}
                    color={e <= seemore?.reviews?.rating ? 'teal.500' : 'gray.300'}
                    />
                    ))
                        // Array(5)
                        // .fill('')
                        // .map((i) => (
                        //   <StarIcon
                        //   key={i}
                        //   color={i <= seemore?.reviews?.rating ? 'teal.500' : 'gray.300'}
                        //   />
                        // ))
                }
                <Box as='span' ml='2' color='gray.600' fontSize='sm'>
                {seemore?.reviews
                ?
                seemore?.reviews?.map((e) => (e?.description)) :
                <span>No dejaron comentario</span>}
                </Box>
                </Box>)
                : (
                    <span>No tienes reviews</span>
                )
            }
        </div>
    )
}
