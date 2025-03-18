import {Box} from "@mui/material";




export default function Test(){




    return (
        <Box sx={{
            background:"linear-gradient(0deg, skyblue 0%, purple 100%)",
            //height:'500px',
            display:'flex',
            flexDirection:'column',
            justifyContent:'center',
            alignItems:'center',
            overflow:'visible'
        }}>
           { [...Array(10).fill(null)].map(item => {
                return <Box
                sx={{
                    border:'2px solid red',
                    margin:"2px",
                    background:'black',

                    height:"30px",
                    width:'30px',
                }}></Box>
           })}

        </Box>
    )
}