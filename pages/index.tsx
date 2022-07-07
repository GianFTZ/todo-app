import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { useState } from "react";
import { getAlltodo, Todo } from "../lib/db";
import { Card_Component } from "./components/cards/cards";
import { Forms_Component } from "./components/forms";
import { Nav_Component } from "./components/navbar/nav";
import { TrashSVG } from "./components/svgs/trashSVG";
import { WriteSVG } from "./components/svgs/writeSvg";

export const getServerSideProps: GetServerSideProps = async () => {
  const toDo = await getAlltodo();
  return {
    props: {
      toDo,
    },
  };
};

interface PostProps {
  toDo: Todo[];
}


const Home = (props: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <div className="h-screen bg-gray-500">
      <Nav_Component />
      <div>
        <Forms_Component />
        <Card_Component TO_DO_LIST={props.toDo} />
      </div>
    </div>
  );
};

export default Home;
