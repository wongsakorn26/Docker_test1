import React, { useState, useEffect } from "react";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import { Grid, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import ButtonBase from '@mui/material/ButtonBase';

const Profile = () => {
  const navigate = useNavigate();
  const MySwal = withReactContent(Swal);
  const [isLoaded, setIsLoaded] = useState(true);
  const [user, setUser] = useState({});
  const [payment, setPayment] = useState(0); // State to store payment amount
  // const apiUrl = process.env.REACT_APP_API_URL;
  // console.log(`API URL: ${apiUrl}`);
  const [file, setFile] = useState();

  // const handleFile = (e) => {
  //   setFile(e.target.files[0])
  // }
  // const handleUpload = () => {
    
  // }
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/');
      return;
    }

    const myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow"
    };

    fetch(process.env.REACT_APP_API_URL + "/authuser", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.status === 'ok') {
          setUser(result.userData[0]);
          setIsLoaded(false);
          // เช็คว่าเป็น admin หรือไม่ แล้วเก็บค่าลงใน localStorage
          if (result.userData[0].cus_id === "admin") {
            localStorage.setItem('isAdmin', 'true');
          } else {
            localStorage.removeItem('isAdmin');
          }
        } else if (result.status === 403) {
          MySwal.fire({
            html: <i>Token Forbidden</i>,
            icon: 'error'
          }).then(() => {
            navigate('/');
          })
        }
      })
      .catch((error) => console.error(error));

  }, []);

  useEffect(() => {
    if (user.id) {
      const requestOptions = {
        method: "GET",
        redirect: "follow"
      };
      
      fetch(process.env.REACT_APP_API_URL + "/users/" + user.id, requestOptions)
        .then((response) => response.json())
        .then((result) => { console.log(result)
          setPayment(result.payment);
        })
        .catch((error) => console.error(error));
    }

    
  }, [user.id]);



  // const Gonext = async () => {
  //   try {
  //     const { value: file } = await Swal.fire({
  //       title: 'Upload File',
  //       input: 'file',
  //       inputAttributes: {
  //         autocapitalize: 'off',
  //         accept: '.jpg,.png,.jpeg'
  //       },
  //       showCancelButton: true,
  //       confirmButtonText: 'Confirm',
  //       showLoaderOnConfirm: true,
  //       allowOutsideClick: () => !Swal.isLoading(),
  //       preConfirm: async (file) => {
  //         if (!file) {
  //           console.error("No file selected");
  //           return;
  //       }
    
  //       const formData = new FormData();
  //       formData.append('image', file);
    
  //       fetch(process.env.REACT_APP_API_URL + '/upload', {
  //           method: "POST",
  //           body: formData
  //       })
  //       .then(response => response.json())
  //       .then(data => {
  //           console.log(data);
  //           if (data.Status === 'Success') {
  //               console.log("Succeeded");
  //           } else {
  //               console.log("Failed");
  //           }
  //       })
  //       .catch(error => console.error(error));
  //       }
  //     });
  
  //     if (file) {
  //       Swal.fire({
  //         title: 'File Uploaded Successfully',
  //         text: `You uploaded ${file.name}`,
  //         icon: 'success'
  //       });
  //     }
  //   } catch (error) {
  //     Swal.fire({
  //       title: 'Error',
  //       text: error.message,
  //       icon: 'error'
  //     });
  //   }
  // };
  

  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('isAdmin'); // ลบค่า isAdmin เมื่อออกจากระบบ
    navigate('/')
  }

  const Img = styled('img')({
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
  });
  if (isLoaded) return (<div>Loading...</div>);
  else {
    return (
      <>
        <Navbar />
        <div>
          <React.Fragment>
            <CssBaseline />
            <Container maxWidth="lg" sx={{ p: 2 }}>

              <Paper
                sx={{
                  p: 2,
                  margin: 'auto',
                  maxWidth: 500,
                  flexGrow: 1,
                  backgroundColor: (theme) =>
                    theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
                }}
              >
                <Grid container spacing={2}>
                  <Grid item>
                    <ButtonBase sx={{ width: 128, height: 128 }}>
                      <Img alt="complex" src="/Promptpay.png" />
                    </ButtonBase>
                  </Grid>
                  <Grid item xs={12} sm container>
                    <Grid item xs container direction="column" spacing={2}>
                      <Grid item xs>
                        <Typography gutterBottom variant="subtitle1" component="div">
                          Payment
                        </Typography>
                        <Typography variant="body2" gutterBottom>
                          วิธีการชำระเงิน :
                          <span>ระบบจะคิด 10%จากกำไรที่ได้และเก็บทุกๆ 7 วันหากจำนวนการชำระเงินเป็น 0 ให้กดปุ่มดำเนินการต่อ</span>
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                        <b>ID: {user.cus_id}<br />
                          จำนวนเงินที่ต้องจ่าย {payment}</b>
                        </Typography>
                      </Grid>
                      <Grid item>
                        
                          <Button  variant="contained" sx={{
                            backgroundColor: '#ff0000', color: 'white', '&:hover': {
                              backgroundColor: '#ff4444', 
                            },
                          }} >ดำเนินการต่อ</Button>
                        
                      </Grid>
                    </Grid>
                    <Grid item>
                      <Typography variant="subtitle1" component="div">
                        รอดำเนินการ
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Paper>

            </Container>
          </React.Fragment>
        </div >
      </>
    )
  }
}

export default Profile;
