import React, { useState } from "react";
import { useEffect } from "react";
import mediaApi from "../../api/modules/media.api";
import { toast } from "react-toastify";
import AutoSwiper from "./AutoSwiper";
import { SwiperSlide } from "swiper/react";
import MediaItem from "./MediaItem";

const MediaSlide = ({ mediaType, mediaCategory }) => {
  const [medias, setMedias] = useState([]);

  useEffect(() => {
    const getMedias = async () => {
      const { response, err } = await mediaApi.getList({
        mediaType,
        mediaCategory,
        page: 1,
      });
      if (response) setMedias(response.results);
      if (err) toast.error(err.message);
    };
    getMedias();
  }, [mediaCategory, mediaType]);
  return (
    <AutoSwiper>
      {medias?.map((media, index) => (
        <SwiperSlide key={index}>
          <MediaItem media={media} mediaType={mediaType}></MediaItem>
        </SwiperSlide>
      ))}
    </AutoSwiper>
  );
};

export default MediaSlide;
