import React, { useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store/store";
import { toggleTheme } from "../../Features/theme/themeSlice";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Container,
} from "@mui/material";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const dispatch = useDispatch();
  const mode = useSelector((state: RootState) => state.theme.mode);

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode]
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            My Blogs
          </Typography>
          <IconButton onClick={() => dispatch(toggleTheme())} color="inherit">
            {mode === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
        </Toolbar>
      </AppBar>
      <Container maxWidth="lg" style={{ marginTop: "94px" }}>
        {children}
      </Container>
    </ThemeProvider>
  );
};

export default Layout;
