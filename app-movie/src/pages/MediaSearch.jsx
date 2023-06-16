import React, { useCallback, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import mediaApi from "./../api/modules/media.api";
import { toast } from "react-toastify";
import { Button, Stack, TextField, Toolbar } from "@mui/material";
import uiConfigs from "./../configs/ui.config";
import MediaGrid from "./../components/common/MediaGrid";
import { LoadingButton } from "@mui/lab";

const mediaTypes = ["movie", "tv", "people"];
const timeout = 500;
let timer;

const MediaSearch = () => {
  const [query, setQuery] = useState("");
  const [onSearch, setOnSearch] = useState(false);
  const [mediaType, setMediaType] = useState(mediaTypes[0]);
  const [medias, setMedias] = useState([]);
  const [page, setPage] = useState(1);

  const search = useCallback(async () => {
    setOnSearch(true);

    const { response, err } = await mediaApi.search({
      mediaType,
      query,
      page,
    });
    setOnSearch(false);

    if (err) toast.error(err.message);
    if (response) {
      if (page > 1) setMedias((m) => [...m, response.results]);
      else setMedias([...response.results]);
    }
  }, [mediaType, page, query]);

  useEffect(() => {
    if (query.trim().length === 0) {
      setMedias([]);
      setPage(1);
    } else search();
  }, [query, search, mediaType]);

  useEffect(() => {
    setMedias([]);
    setPage(1);
  }, [mediaType]);

  const onCategoryChange = (selectedCategory) => {
    setMediaType(selectedCategory);
  };

  const onQueryChange = (e) => {
    const newQuery = e.target.value;
    clearTimeout(timer);
    timer = setTimeout(() => {
      setQuery(newQuery);
    }, timeout);
  };
  // console.log("medias", medias);

  return (
    <>
      <Toolbar />
      <Box sx={{ ...uiConfigs.style.mainContent }}>
        <Stack spacing={2}>
          <Stack
            spacing={2}
            direction="row"
            justifyContent="center"
            sx={{ width: "100%" }}
          >
            {mediaTypes.map((item, index) => (
              <Button
                size="large"
                key={index}
                variant={mediaType === item ? "contained" : "text"}
                sx={{
                  color:
                    mediaType === item
                      ? "primary.contrastText"
                      : "text.primary",
                }}
                onClick={() => onCategoryChange(item)}
              >
                {item}
              </Button>
            ))}
          </Stack>
          <TextField
            color="success"
            placeholder="Search MoonFlix"
            sx={{ width: "100%" }}
            autoFocus
            onChange={onQueryChange}
          />
          <MediaGrid medias={medias} mediaType={mediaType} />
          {medias.length > 0 && (
            <LoadingButton loading={onSearch} onClick={() => setPage(page + 1)}>
              load more
            </LoadingButton>
          )}
        </Stack>
      </Box>
    </>
  );
};

export default MediaSearch;
