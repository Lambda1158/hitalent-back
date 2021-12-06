import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getQAbyId, createAnswer } from "../../../actions/index";

export default function Qas() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const qa = useSelector((state) => state.index.qa);
  const [answer, setAnswer] = useState("");

  function handleChange(e) {
    e.preventDefault();
    setAnswer(e.target.value);
  }

  function handleOnSubmit(e, id) {
    e.preventDefault();
    dispatch(createAnswer(answer, id));
    console.log("Este es el id del input " + id);
  }

  useEffect(() => {
    dispatch(getQAbyId(id));
  }, [dispatch, id]);

  return (
    <div className="flex flex-col justify-center bg-dark border-2 text-white border-white rounded-lg w-11/12 py-4">
      <div className="flex flex-col items-center py-2">
        {!(qa.posts?.length > 0) ? (
          <h2>No tienes publicaciones para obtener preguntas...</h2>
        ) : qa.posts[0].questions.length > 0 ? (
          qa.posts?.map((e) => (
            <div className="flex flex-col items-center bg-dark border-2 text-white border-white rounded-lg w-11/12 py-4">
              <div className="flex flex-row justify-center items-center  bg-semidark text-white w-11/12 h-auto m-1">
                <div className="flex flex-row justify-between items-center border w-full p-1">
                  {e.questions?.map((e) => (
                    <div>{e.question}</div>
                  ))}

                  <span className="ml-2 italic">
                    {e.questions?.map((e) => e.user?.username)}
                  </span>
                </div>
              </div>
              <div className="flex  items-center bg-semidark w-11/12 rounded">
                {e.questions.map((el) =>
                  el.answer ? (
                    el.answer
                  ) : (
                    <form onSubmit={(e) => handleOnSubmit(e, el.id)}>
                      <input
                        className="w-full rounded bg-semidark text-white placeholder-light"
                        name="answer"
                        value={answer}
                        onChange={(e) => handleChange(e)}
                        placeholder="Añade tu respuesta aquí..."
                      />
                      <button
                        type="submit"
                        className="btn-quaternary btn-colors mx-2"
                      >
                        Enviar
                      </button>
                    </form>
                  )
                )}
              </div>
            </div>
          ))
        ) : (
          <h1>No tienes preguntas por el momento...</h1>
        )}
      </div>
    </div>
  );
}
