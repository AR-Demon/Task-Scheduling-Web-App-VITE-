import React from "react";
import { ThemeProvider } from "@emotion/react";
import {
  Drawer,
  Box,
  Grid,
  Slide,
  createTheme,
  Avatar,
  Typography,
  Stack,
  AppBar,
  Toolbar,
  styled,
  LinearProgress,
  linearProgressClasses,
  CircularProgress,
} from "@mui/material";

import { defaultTheme } from "../theme/defaultThemes";
import dobby from "../../../assets/dobby.png";
import { useContext } from "react";
import StatContext from "./StatContext";
import { levelBarTheme } from "../theme/levelBarThemes";
import { StatIconLevel } from "../widget/statIconLevel";

export function UserStatsBar() {
  const [progress, setProgress] = React.useState(0);

  const { statLevel } = useContext(StatContext);

  //Linear Progress function for style
  const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 10,
    borderRadius: 10,
    [`&.${linearProgressClasses.colorPrimary}`]: {
      backgroundColor: "white",
    },
    [`& .${linearProgressClasses.bar}`]: {
      borderRadius: 5,
      backgroundColor: "text.main",
    },
  }));

  //code to refresh stat level state every 500 milliseconds for progress of level bar
  React.useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 100) {
          return 0;
        }
        return statLevel.Strength;
      });
    }, 500);

    return () => {
      clearInterval(timer);
    };
  }, []);

  //Returns a level bar with styled linear progress and stat icon attached
  function LevelBar(stat) {
    return (
      <Box display={"flex"} alignItems={"center"}>
        <Box sx={{ translate: 40, zIndex: 1 }}>
          <StatIconLevel stat={stat} />
        </Box>
        <Toolbar variant="dense" sx={levelBarTheme}>
          <Box sx={{ width: "80%", marginLeft: 5, marginRight: 2 }}>
            <BorderLinearProgress variant="determinate" value={progress} />
          </Box>
          {statLevel[stat]}
        </Toolbar>
      </Box>
    );
  }
  return (
    <ThemeProvider theme={defaultTheme}>
      <Box
        sx={{
          display: "flex",
          position: "fixed",
          alignItems: "center",
          flexDirection: "column",
          height: "100vh",
          color: "white",
          gap: 1,

          backgroundImage:
            "linear-gradient( 179deg,  rgba(0,0,0,1) 20.2%, rgba(127,16,16,1) 70.9% )",
          width: "25vw",
        }}
      >
        <Avatar sx={{ width: 175, height: 175, marginTop: 12 }} src={dobby} />

        <CircularProgress variant="determinate" value={25} />

        <Typography variant="h4">Dobby</Typography>

        <Box
          sx={{
            marginTop: 15,
            display: "flex",
            flexDirection: "column",
            gap: 3,
          }}
        >
          {LevelBar("Strength")}
          {LevelBar("Intelligence")}
          {LevelBar("Health")}
          {LevelBar("Charisma")}
          {LevelBar("Creativity")}
        </Box>
      </Box>
    </ThemeProvider>
  );
}
