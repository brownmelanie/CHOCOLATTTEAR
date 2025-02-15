import { motion } from "framer-motion";

const AnimatedPage = ({ children }) => {
    const pageVariants = {
        initial: {
        opacity: 0,
        },
        in: {
        opacity: 1,
        },
        out: {
        opacity: 0,
        },
    };

    const pageTransition = {
        type: "tween",
        ease: "anticipate",
        duration: 0.4,
    };

    return (
        <motion.div
        initial="initial"
        animate="in"
        exit="out"
        variants={pageVariants}
        transition={pageTransition}
        >
        {children}
        </motion.div>
    );
};

export default AnimatedPage;