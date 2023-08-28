import { Box } from "@mui/material"
import hellookitty from "../assets/hellookitty.jpg"

const UserImage = ({ size }) => {
  return (
    <Box
     >
        <img
        style={{ objectFit: "cover", borderRadius: "50%" }}
        width="80rem"
        height="80rem"
        alt="user"
        src={hellookitty}        
        />
    </Box>
    )
}

export default UserImage