import loaderImage from '../assets/icon-logo.png';
import useWindowHeight from "../components/functions/calcWindowHeight.jsx"

const Loader = () => {
    const windowHeight = useWindowHeight();

    return (
        <div
            className="flex items-center justify-center bg-white"
            style={{ height: `${windowHeight}px`, width: '100%' }}
        >
            <img
                src={loaderImage}
                alt="Loading"
                className="animate-pulse w-24 h-auto"
            />
        </div>
    );
};

export default Loader;