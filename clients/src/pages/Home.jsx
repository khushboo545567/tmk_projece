import React from "react";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";

const Home = function () {
  return (
    <div className="bg-pink-50 h-dvh">
      <Navbar/>
      <div className="">
        <div className=" px-6 lg:px-20 bg-pink-50">
          <div className="font-bold py-14 text-center text-2xl md:text-4xl ">
            Manage Your Task
          </div>
          <div className="md:flex items-center">
            <div className=" w-full md:w-3/5  flex flex-col gap-4 sm:p-6 items-center text:lg md:text-xl">
              <p>
                Effortlessly organize, track, and complete your tasks with our
                all-in-one Task Manager App. Designed for individuals and teams,
                this application is your ultimate productivity companion.
              </p>
              <p>Easily create, manage, and track tasks through our user-friendly interface. Whether you’re a student, professional, or project manager, our app adapts to your workflow.</p>
              <h1 className="text-center font-bold text-2xl pt-6"><Link to="/signup" className=" hover:underline">Get Started Today!</Link></h1>
              <p>Whether you’re planning your personal goals or managing a complex project, the Task Manager App is here to make your life easier. <Link to="/signup " className="text-blue-500 underline">Sign up</Link> now and take control of your tasks like never before!
              </p>
            </div>
            <div className=" w-full md:w-2/5 object-cover">
              <img src="./task.jpg" alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
