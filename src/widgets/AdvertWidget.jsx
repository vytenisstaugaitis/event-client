import { Typography, useTheme } from "@mui/material";
import FlexBetween from "../components/FlexBetween";
import WidgetWrapper from "../components/WidgetWrapper";
import angelware from "../assets/angelware.jpg";

const AdvertWidget = () => {
  const { palette } = useTheme();
  const dark = palette.neutral.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;

  return (
    <WidgetWrapper>
      <FlexBetween>
        <Typography color={dark} variant="h5" fontWeight="500">
          Sponsored by
        </Typography>
        <Typography color={medium}>Create Ad</Typography>
      </FlexBetween>
      <img
        width="100%"
        height="auto"
        alt="advert"
        src={angelware}
        style={{ borderRadius: "0.75rem", margin: "0.75rem 0" }}
      />
      <FlexBetween>
        <Typography color={main}>Angelware</Typography>
        <Typography color={medium}>angelware.com</Typography>
      </FlexBetween>
      <Typography color={medium} m="0.5rem 0">
        Goddess Angelware embodies grace, beauty, and divine energy, radiating
        strength and wisdom to inspire and uplift all who encounter her.
      </Typography>
    </WidgetWrapper>
  );
};

export default AdvertWidget;
