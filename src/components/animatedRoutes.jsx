import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import VideoIntro from "../screens/intro.jsx";
import Home from "../screens/home.jsx";
import Photos from "../screens/photos.jsx";
import Direction from "../screens/direction.jsx";
import About from "../screens/aboutMe.jsx";
import Merch from "../screens/merch.jsx";
import Login from "../screens/loginFirebase.jsx";
import ImageUpload from "../screens/formFirebase.jsx";
import PhotoDetails from "../screens/photoDetail.jsx";

import AnimatedPage from "./animatedPage.jsx";

const AnimatedRoutes = () => {
    const location = useLocation();

    return (
        <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
            <Route
            path="/"
            element={
                <AnimatedPage>
                <VideoIntro />
                </AnimatedPage>
            }
            />
            <Route
            path="/home"
            element={
                <AnimatedPage>
                <Home />
                </AnimatedPage>
            }
            />
            <Route
            path="/photos"
            element={
                <AnimatedPage>
                <Photos />
                </AnimatedPage>
            }
            />
            <Route 
            path="/details/:id" 
            element={
                <AnimatedPage>
                    <PhotoDetails />
                </AnimatedPage>
            }
            />
            <Route
            path="/direction"
            element={
                <AnimatedPage>
                <Direction />
                </AnimatedPage>
            }
            />
            <Route
            path="/about"
            element={
                <AnimatedPage>
                <About />
                </AnimatedPage>
            }
            />
            <Route
            path="/merch"
            element={
                <AnimatedPage>
                <Merch />
                </AnimatedPage>
            }
            />
            <Route
            path="/login"
            element={
                <AnimatedPage>
                <Login />
                </AnimatedPage>
            }
            />
            <Route
            path="/3GzUx6zy"
            element={
                <AnimatedPage>
                <ImageUpload />
                </AnimatedPage>
            }
            />
        </Routes>
        </AnimatePresence>
    );
};

export default AnimatedRoutes;