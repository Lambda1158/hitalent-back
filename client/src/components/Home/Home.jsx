import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Nav from "./Nav";
import Footer from "../Landing/Footer";
import TalentCard from "./TalentCard";
import { getTalents } from "../../actions";
import Categories from "./Categories";
import Form from "../SignIn/FormSI";
import Register from "../Register/Register";
import { SortByPrice } from "../Sort/SortByPrice";

export default function Home() {
  let skill = useSelector((state) => state.index.filteredTalents);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTalents());
  }, [dispatch]);

  const [ventanaLogIn, setVentanaLogIn] = useState(false)
  const [ ventanaRegister, setVentanaRegister ] = useState(false)
  
  function onModalClick(e){
      e.preventDefault()
      setVentanaLogIn(!ventanaLogIn)
  }
  function onModaleClick(e) {
      e.preventDefault()
      setVentanaRegister(!ventanaRegister)
  }
  function onModalChange(e){
      e.preventDefault()
      setVentanaLogIn(!ventanaLogIn)
      setVentanaRegister(!ventanaRegister)
  }

  return (
    <div  class='user-select-none'>
      <Nav onModalChange={onModalChange} onModaleClick={onModaleClick} onModalClick={onModalClick}/>
      <div>
        {
          ventanaLogIn ? <Form onModalClick={onModalClick} onModalChange={onModalChange}/> : console.log("ingreso")
        }{
          ventanaRegister ? <Register onModaleClick={onModaleClick} onModalChange={onModalChange}/> : console.log("registro")
        }
        <h1 class="text-4xl font-bold m-4">CATEGORIAS</h1>
        <Categories /> <hr />
        <h1 class="text-4xl font-bold m-4">TALENTOS</h1>
      </div>
      <div class='flex justify-end'>
        <SortByPrice/>
      </div>
      <div class="flex flex-row flex-wrap items-center content-around justify-around m-3">
        {skill?.length === 0 ? (
          <div className="not_found">not found</div>
        ) : (
          skill?.map((talent) => {
            return (
              <TalentCard
                key={talent.id}
                id={talent.id}
                username={talent?.user?.username}
                title={talent.title}
                description={talent.description}
                image={talent.image}
                cost={talent.cost}
              />
            );
          })
        )}
      </div>
      <Footer />
    </div>
  );
}
