import React, { memo, useState } from "react";
import { Box, Tab as MUITab, Tabs, Typography } from "@mui/material";
import { SxProps, Theme } from "@mui/material/styles";
import { colorPalette } from "@/styles/styles";

interface TabItem {
  label: string;
  icon?: string | React.ReactElement;
  content: React.ReactNode;
}

interface TabProps {
  tabItems: TabItem[];
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const CustomTabPanel: React.FC<TabPanelProps> = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <Box
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ mt: 2 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </Box>
  );
};

const a11yProps = (index: number) => {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
};

const Tab: React.FC<TabProps> = ({ tabItems }) => {
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const tabSx: SxProps<Theme> = {
    justifyContent: "flex-start",
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: colorPalette.success.main }}>
        <Tabs
          value={value}
          onChange={handleChange}
          textColor="primary"
          indicatorColor="primary"
          aria-label="dynamic tabs"
          variant="fullWidth"
        >
          {tabItems.map((item, index) => (
            <MUITab
              key={item.label}
              label={item.label}
              {...a11yProps(index)}
              icon={item.icon || undefined}
              iconPosition="start"
              sx={tabSx}
            />
          ))}
        </Tabs>
      </Box>
      {tabItems.map((item, index) => (
        <CustomTabPanel key={item.label} value={value} index={index}>
          {item.content}
        </CustomTabPanel>
      ))}
    </Box>
  );
};

export default memo(Tab);
