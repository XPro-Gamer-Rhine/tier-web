"use client";
import Tab from "@/components/tab";
import { TabItems } from "@/components/tab-items";
import { Box, Stack, Typography } from "@mui/material";

const AdminDashboard = () => {
  const Header = (
    <Stack
      direction={"row"}
      sx={{
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Typography variant="h5" color="#202020FF" fontWeight={500}>
        Dashboard
      </Typography>
    </Stack>
  );
  return (
    <Stack direction={"column"} gap={5}>
      {Header}
      <Box sx={{ width: "100%" }}>
        <Tab tabItems={TabItems} />
      </Box>
    </Stack>
  );
};

export default AdminDashboard;
