import Box from "@mui/material/Box";
import { SwiperSlide } from "swiper/react";
import NavigationSwiper from "./NavigationSwiper";
import tmdbConfigs from "../../api/configs/tmdb.configs";

const BackdropSlide = ({ backdrops }) => {
  // console.log("backdrops", backdrops);
  return (
    <NavigationSwiper>
      {backdrops.splice(0, 5).map((item, index) => (
        <SwiperSlide key={index}>
          <Box
            sx={{
              paddingTop: "60%",
              backgroundPosition: "top",
              backgroundSize: "cover",
              backgroundImage: `url(${tmdbConfigs.backdropPath(
                item.file_path
              )})`,
            }}
          ></Box>
        </SwiperSlide>
      ))}
    </NavigationSwiper>
  );
};

export default BackdropSlide;
