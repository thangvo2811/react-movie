import React, { useEffect, useRef } from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { LoadingButton } from "@mui/lab";
import Box from "@mui/material/Box";
import { Button, Chip, Divider, Stack, Typography } from "@mui/material";
import { toast } from "react-toastify";
import CircularRate from "./../components/common/CircularRate";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { setGlobalLoading } from "../redux/features/globalLoading";
import { setAuthModalOpen } from "../redux/features/authModalSlice";
import { addFavorites, removeFavorites } from "../redux/features/userSlice";
import mediaApi from "./../api/modules/media.api";
import ImageHeader from "../components/common/ImageHeader";
import tmdbConfigs from "../api/configs/tmdb.configs";
import uiConfigs from "../configs/ui.config";
import Container from "./../components/common/Container";
import CastSlide from "../components/common/CastSlide";

const MediaDetail = () => {
  const { mediaType, mediaId } = useParams();
  const videoRef = useRef();
  const dispatch = useDispatch();
  console.log(mediaId);

  const { user, listFavorites } = useSelector((state) => state.user);

  const [media, setMedia] = useState();
  const [isFavorite, setIsFavorite] = useState(false);
  const [onRequest, setOnRequest] = useState(false);
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    const getMedia = async () => {
      dispatch(setGlobalLoading(true));
      const { response, err } = await mediaApi.getDetail({
        mediaType,
        mediaId,
      });
      console.log(mediaId);
      dispatch(setGlobalLoading(false));

      if (response) {
        setMedia(response);
        setIsFavorite(response.isFavorite);
        setGenres(response.genres.splice(0, 2));
      }
      if (err) toast.error(err.message);
    };
    getMedia();
  }, [dispatch, mediaId, mediaType]);

  return media ? (
    <>
      <ImageHeader
        imgPath={tmdbConfigs.backdropPath(
          media.backdrop_path || media.poster_path
        )}
      />
      <Box
        sx={{ color: "primary.contrastText", ...uiConfigs.style.mainContent }}
      >
        {/* media content */}
        <Box sx={{ marginTop: { xs: "-10rem", md: "-15rem", lg: "-20rem" } }}>
          <Box
            sx={{ display: "flex", flexDirection: { md: "row", xs: "column" } }}
          >
            {/* poster */}
            <Box
              sx={{
                width: { xs: "70%", sm: "50%", md: "40%" },
                margin: { xs: "0 auto 2rem", md: "0 2rem 0 0" },
              }}
            >
              <Box
                sx={{
                  paddingTop: "140%",
                  ...uiConfigs.style.backgroundImage(
                    tmdbConfigs.posterPath(
                      media.poster_path || media.backdrop_path
                    )
                  ),
                }}
              />
            </Box>
            {/* poster */}
            {/* media info */}
            <Box
              sx={{ width: { xs: "100%", md: "60%", color: "text.primary" } }}
            >
              <Stack spacing={5}>
                {/* title */}
                <Typography
                  variant="h4"
                  fontSize={{ xs: "2rem", md: "2rem", lg: "4rem" }}
                  fontWeight="700"
                  sx={{ ...uiConfigs.style.typoLines(2, "left") }}
                >{`${media.title || media.name} ${
                  mediaType === tmdbConfigs.mediaType.movie
                    ? media.release_date.split("-")[0]
                    : media.first_air_date.split("-")[0]
                }`}</Typography>
                {/* title */}

                {/* rate and genres */}
                <Stack direction="row" spacing={1} alignItems="center">
                  {/* rate */}
                  <CircularRate value={media.vote_average} />
                  {/* rate */}
                  <Divider orientation="vertical" />
                  {/* genres */}
                  {genres.map((genre, index) => (
                    <Chip
                      label={genre.name}
                      variant="filled"
                      color="primary"
                      key={index}
                    />
                  ))}
                  {/* genres */}
                </Stack>
                {/* rate and genres */}

                {/* overview */}
                <Typography
                  variant="body1"
                  sx={{ ...uiConfigs.style.typoLines(5) }}
                >
                  {media.overview}
                </Typography>
                {/* overview */}

                {/* button */}
                <Stack direction="row" spacing={1}>
                  <LoadingButton
                    variant="text"
                    sx={{
                      width: "max-content",
                      "& .MuiButton-startIcon": { marginRight: "0" },
                    }}
                    size="large"
                    startIcon={
                      isFavorite ? (
                        <FavoriteIcon />
                      ) : (
                        <FavoriteBorderOutlinedIcon />
                      )
                    }
                    loadingPosition="start"
                    loading={onRequest}
                    // onClick={}
                  />
                  <Button
                    variant="contained"
                    sx={{ width: "max-content" }}
                    size="large"
                    startIcon={<PlayArrowIcon />}
                    onClick={() => videoRef.current.scrollIntoView()}
                  >
                    watch now
                  </Button>
                </Stack>
                {/* button */}

                {/* cast */}
                <Container header="Cast">
                  <CastSlide casts={media.credits.cast}></CastSlide>
                </Container>
                {/* cast */}
              </Stack>
            </Box>
            {/* media info */}
          </Box>
        </Box>
        {/* media content */}
      </Box>
    </>
  ) : null;
};

export default MediaDetail;
