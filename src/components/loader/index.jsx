import { Box } from "@mui/material";
import { TailSpin } from "react-loader-spinner";

const Loader = ({ color }) => {
  return (
    <>
      <Box className="d-flex justify-center">
        <TailSpin
          color={color ? color : "#6366f1"}
          height={50}
          width={50}
          timeout={3000}
        />
      </Box>
    </>
  );
};

export default Loader;
