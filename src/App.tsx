import React, { useState } from "react";
import "./App.css";
import { DndContext } from "@dnd-kit/core";
import Draggable from "./Draggable";
import Droppable from "./Droppable";
import { ActiveDraggableContext } from "@dnd-kit/core/dist/components/DndContext";

//https://docs.dndkit.com/introduction/installation
//install:  npm install @dnd-kit/core
// install: npm install react react-dom
/*
 hade issue which solve by looking at this:
 https://stackoverflow.com/questions/41462729/typescript-react-could-not-find-a-declaration-file-for-module-react-material

*/

function App() {
  const containers = ["React", "Redux", "TypeScript", "Firebase"];
  const [parent, setParent] = useState(null);
  // const posts = [
  //   {id: 1, title: 'Hello World', content: 'Welcome to learning React!'},
  //   {id: 2, title: 'Installation', content: 'You can install React from npm.'}
  // ];

  type Skills = {
    [skill: string]: {
      text: string;
      image: string;
    };
  };

  const skillMap: Skills = {
    React: {
      text: "React is a Js Library",
      image: "https://miro.medium.com/max/500/1*cPh7ujRIfcHAy4kW2ADGOw.png",
    },
    Redux: {
      text: "Redux is a state management tool",
      image: "https://avatars0.githubusercontent.com/u/13142323?s=400&v=4",
    },
    TypeScript: {
      text: "Makes JS Strongly typed",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Typescript_logo_2020.svg/512px-Typescript_logo_2020.svg.png",
    },
    Firebase: {
      text:
        "Its both for storing into database and have auth and also for deployment",
      image:
        "data:image/png;base64,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",
    },
  };

  function handleDragEnd(event) {
    const { over, active } = event;

    // If the item is dropped over a container, set it as the parent
    // otherwise reset the parent to `null`
    console.log("OVER...", over); //OVER... {id: "TypeScript"}
    console.log("ACTIVE...", active);
    setParent(over ? active.id : null);
  }

  const draggableMarkup = (id: string) => (
    <Draggable id={id}>
      <img className="app__skillLogo" src={skillMap[id].image} alt="logo" />
    </Draggable>
  );

  console.log("PARENT...", parent); //React, Redux, TS, Firebase

  return (
    <div className="app">
      <DndContext onDragEnd={handleDragEnd}>
        {/* {draggableMarkup} */}
        {/* // if the Id is not equal to Parent then render it */}

        <div className="app__skills">
          {containers.map((id) => (id !== parent ? draggableMarkup(id) : null))}
        </div>

        {parent ? (
          <h3 className="app__skillDetails">
            Click a logo to reset or drag another to view more information
          </h3>
        ) : null}

        <Droppable key={"id"} id={"react"}>
          {parent === null ? (
            <div className="app__infoBox app__infoBox--inactive">
              <h3>Click & Drop here to display more info...</h3>
            </div>
          ) : (
            <div className="app__infoBox">
              <img
                className="app__skillLogo"
                src={skillMap[parent!].image}
                alt="logo"
              />
              <h2>{parent}</h2>
              <p>{skillMap[parent!].text}</p>
            </div>
          )}
        </Droppable>
      </DndContext>
    </div>
  );
}

export default App;
