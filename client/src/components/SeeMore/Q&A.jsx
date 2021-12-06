import React, { useState } from "react";
import { Input, Button } from "@chakra-ui/react";
import { postQuestion } from "../../actions";
import { useDispatch, useSelector } from "react-redux";

export default function QyA() {
  const questionsPost = useSelector((state) => state.index.questionsPost);
  const user = useSelector((state) => state.index.user);
  const dispatch = useDispatch();
  const [question, setQuestion] = useState("");


  let body = {
    question: question,
    user_id: user.id,
    post_id: questionsPost.id,
  };
  console.log("body del state", body);

  function onSubmit(e) {
    e.preventDefault();
    // console.log("body del dispatch", body);
    // dispatch(
    //   postQuestion({
    //     question: question,
    //     user_id: user.id,
    //     post_id: questionsPost.id,
    //   })
    // );
    // setQuestion("");
  }

  function onChange(e) {
    e.preventDefault();
    setQuestion(e.target.value);
  }

  function onClick(e) {
    console.log("body del dispatch", body);
    e.preventDefault();
    dispatch(postQuestion(body));
  }

  return (
    <div class="m-3">
      <h3 class="text-xl font-semibold">Deja tu pregunta</h3>
      <form onSubmit={(e) => onSubmit(e)}>
        <Input
          value={question}
          onChange={onChange}
          placeholder="Ingrese su pregunta"
          size="md"
        />
        <Button onClick={(e) => onClick(e)}>Enviar</Button>
      </form>
    </div>
  );
}
