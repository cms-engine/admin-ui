"use client";

import Link from "next/link";
import { AppBar, Toolbar, Typography, Box } from "@mui/material";
import LocaleSwitcher from "./LocaleSwitcher";

export default function Header() {
  return (
    <AppBar position="static" sx={{ mb: 2 }}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          <Link href="/" style={{ textDecoration: "none", color: "inherit" }}>
            My Admin Panel
          </Link>
        </Typography>
        <Box>
          <LocaleSwitcher />
        </Box>
      </Toolbar>
    </AppBar>
  );
}
