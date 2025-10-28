/* eslint-disable react/prop-types */
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useState } from "react";

const ImageGallery = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  function handlePrevClick() {
    if (currentIndex > 0) {
      setCurrentIndex((prevIndex) => prevIndex - 1);
    } else {
      setCurrentIndex(images.length - 1);
    }
  }

  function handleNextClick() {
    if (currentIndex < images.length - 1) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    } else {
      setCurrentIndex(0);
    }
  }

  return (
    <div className=" relative flex items-center justify-center ">
      {images.length > 1 && (
        <button className=" absolute top-46 left-2" onClick={handlePrevClick}>
          <ArrowBackIosNewIcon />
        </button>
      )}
      <img className=" h-80 " src={images[currentIndex]} />
      {images.length > 1 && (
        <button className=" absolute top-46 right-2" onClick={handleNextClick}>
          <ArrowForwardIosIcon />
        </button>
      )}
    </div>
  );
};

export default ImageGallery;
