import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { useParams } from "react-router-dom";
import personApi from "../api/modules/person.api";
import { toast } from "react-toastify";
import { Stack, Toolbar, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { setGlobalLoading } from "../redux/features/globalLoading";
import uiConfigs from "../configs/ui.config";
import tmdbConfigs from "../api/configs/tmdb.configs";
import Container from "../components/common/Container";
import PersonMediaGrid from "../components/common/PersonMediaGrid";

const PersonDetail = () => {
  const { personId } = useParams();
  const [person, setPerson] = useState({});
  const dispatch = useDispatch();

  useEffect(() => {
    const getPerson = async () => {
      dispatch(setGlobalLoading(true));
      const { response, err } = await personApi.detail({ personId });
      dispatch(setGlobalLoading(false));

      if (err) toast.error(err.message);
      if (response) setPerson(response);
      console.log(response);
    };
    getPerson();
  }, [dispatch, personId]);

  return (
    <>
      <Toolbar />
      {person && (
        <>
          <Box sx={{ ...uiConfigs.style.mainContent }}>
            <Box
              sx={{
                position: "relative",
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
              }}
            >
              <Box sx={{ width: { xs: "50%", md: "20%" } }}>
                <Box
                  sx={{
                    paddingTop: "160%",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundColor: "darkgrey",
                    backgroundImage: `url(${tmdbConfigs.posterPath(
                      person?.profile_path
                    )})`,
                  }}
                />
              </Box>
              <Box
                sx={{
                  xs: "100%",
                  md: "80%",
                  padding: { xs: "1rem 0", md: "1rem 2rem" },
                }}
              >
                <Stack spacing={2}>
                  <Typography variant="h5" fontWeight="700">
                    {`${person.name} (${person.birthday})`}
                    {person.deathday && `${person.deathday}`}
                    {/* {")"} */}
                  </Typography>
                  <Typography sx={{ ...uiConfigs.style.typoLines(10) }}>
                    {person.biography}
                  </Typography>
                </Stack>
              </Box>
            </Box>
          </Box>
          {/* <Container header="medias">
            <PersonMediaGrid personId={personId}></PersonMediaGrid>
          </Container> */}
        </>
      )}
    </>
  );
};

export default PersonDetail;
