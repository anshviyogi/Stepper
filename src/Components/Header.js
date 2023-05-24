import React from 'react'
import { Box, Typography } from '@mui/material';

function Header() {
  return (
    <Box sx={{margin:"20px",backgroundColor:"red",padding:"15px",color:"white",justifyContent:"space-between",display:"flex",borderRadius:"10px"}}>
    {/*LEFT DESIGN*/}
    <Box sx={{display:"flex"}}>
    <Typography>User Dashboard /</Typography>
    <Typography sx={{fontSize:"14px",marginTop:"2px"}}>{"  "}Attendence</Typography>
    </Box>

    <Box sx={{display:"flex"}}>
    <Typography sx={{fontSize:"15px",fontWeight:"bold",cursor:"pointer"}}>LOGOUT</Typography>
    </Box>

    </Box>
  )
}

export default Header