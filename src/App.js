import React, { useState, useRef } from 'react';
import { Container, Card, CardContent, makeStyles, Grid, TextField, Button } from '@material-ui/core';
import QRCode from 'qrcode';
import QrReader from 'react-qr-reader';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

function App() {
  const [trainersName, setTrainersName] = useState('');
  const [progamName, setProgamName] = useState('');
  const [lat, setLat] = useState('');
  const [long, setLong] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [expiryTime, setExpiryTime] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [scanResultFile, setScanResultFile] = useState('');
  const [scanResultWebCam, setScanResultWebCam] = useState('');
  const [openCamFlag, setOpenCamFlag] = useState(false);
  const [personName, setPersonName] = React.useState([]);
  const classes = useStyles();
  const qrRef = useRef(null);
  //const theme = useTheme();

  const names = [
    'Kartik',
    'Ranjeet',
    'Sandeep',
    'Akshay',
    'Chaitanya',
    'Saurabh',
    'Vijay',
    'Anupam',
    'Srishti',
  ];

  const handleChange = (event) => {
    const { target: { value } } = event;
    setPersonName(
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  const generateQrCode = async () => {
    let qrCodeObj = { trainersName, progamName, expiryDate, expiryTime, lat, long, personName }
    try {
      const response = await QRCode.toDataURL(JSON.stringify(qrCodeObj));
      setImageUrl(response);
    } catch (error) {
      console.log(error);
    }
  }
  const handleErrorFile = (error) => {
    console.log(error);
  }
  const handleScanFile = (result) => {
    if (result) {
      setOpenCamFlag(false);
      setScanResultWebCam(JSON.parse(result));
    }
  }
  const onScanFile = () => {
    qrRef.current.openImageDialog();
  }
  const handleErrorWebCam = (error) => {
    console.log(error);
  }
  const handleScanWebCam = (result) => {
    if (result) {
      setOpenCamFlag(false);
      setScanResultWebCam(JSON.parse(result));
    }
  }
  return (
    <Container className={classes.conatiner}>
      <Card>
        <h2 className={classes.title}>Generate Download & Scan QR Code with React js</h2>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xl={4} lg={4} md={6} sm={12} xs={12}>
              <Grid item lg={12} md={12}>
                <TextField fullWidth label="Trainer's Name" onChange={(e) => setTrainersName(e.target.value)} />
                <TextField fullWidth label="Programe Name" onChange={(e) => setProgamName(e.target.value)} />
                <TextField fullWidth label="Latitude" onChange={(e) => setLat(e.target.value)} />
                <TextField fullWidth label="Longitude" onChange={(e) => setLong(e.target.value)} />
                <TextField fullWidth label="ExpiryDate" onChange={(e) => setExpiryDate(e.target.value)} />
                <TextField fullWidth label="ExpiryTime" onChange={(e) => setExpiryTime(e.target.value)} />
                <div>
                  <FormControl className={classes.formControl}>
                    <InputLabel id="demo-mutiple-name-label">Select Candidates</InputLabel>
                    <Select
                      multiple
                      value={personName}
                      onChange={handleChange}
                      input={<Input />}
                    // MenuProps={MenuProps}
                    >
                      {names.map((name) => (
                        <MenuItem key={name} value={name}>
                          {name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </div>
              </Grid>

              <Button className={classes.btn}
                variant="contained"
                color="primary"
                onClick={() => generateQrCode()}>
                Generate QR code
              </Button>
              <br />
              <div className={classes.qrcodeBox}>
                {imageUrl ? (<a href={imageUrl} download> <img src={imageUrl} alt="img" /> </a>) : null}
              </div>
            </Grid>

            <Grid item xl={4} lg={4} md={6} sm={12} xs={12}>
              <Button className={classes.btn} variant="contained" color="secondary" onClick={onScanFile}>Scan Qr Code</Button>
              <QrReader
                ref={qrRef}
                delay={300}
                style={{ width: '100%' }}
                onError={handleErrorFile}
                onScan={handleScanFile}
                legacyMode
              />
              {/* <h3>Scanned Code: {scanResultFile}</h3> */}
            </Grid>

            <Grid item xl={4} lg={4} md={6} sm={12} xs={12}>
              {/* <h3>Qr Code Scan by Web Cam</h3> */}
              <div>
                <Button className={classes.btn} variant="contained" color="secondary" onClick={() => setOpenCamFlag(true)}>
                  Open Camera to scan QR code
                </Button>
              </div>
              {
                openCamFlag ? (
                  <QrReader
                    delay={300}
                    style={{ width: '100%' }}
                    onError={handleErrorWebCam}
                    onScan={handleScanWebCam}
                  />
                ) : (
                  <div>
                    {scanResultWebCam ? (
                      <div className={classes.scannedDetail}>
                        <div><b>Trainer's Name: </b>{scanResultWebCam.trainersName}</div>
                        <div><b>Program Name: </b>{scanResultWebCam.progamName}</div>
                        <div><b>Expiry Date: </b>{scanResultWebCam.expiryDate}</div>
                        <div><b>Expiry Time: </b>{scanResultWebCam.expiryTime}</div>
                        <div><b>Latitude: </b>{scanResultWebCam.lat}</div>
                        <div><b>Longitude: </b>{scanResultWebCam.long}</div>
                        <div>
                          <b>You attendance is marked if your name is </b>
                          <i>{scanResultWebCam ? scanResultWebCam.personName.toString() : ''}</i>
                        </div>
                      </div>
                    ) : (null)}

                  </div>
                )
              }

              {/* <h3>Scanned By WebCam Code: {scanResultWebCam}</h3> */}
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Container>
  );
}

const useStyles = makeStyles((theme) => ({
  conatiner: {
    marginTop: 10
  },
  formGrid: {

  },
  title: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: '#3f51b5',
    color: '#fff',
    padding: 20
  },
  btn: {
    marginTop: 10,
    marginBottom: 20
  },
  formControl: {
    width: '100%',
  },
  qrcodeBox: {
    textAlign: 'center'
  },
  scannedDetail: {
    background: '#90ff90',
    border: '3px solid #06ac06',
    padding: '1rem',
    borderRadius: '4px',
  }
}));
export default App;
