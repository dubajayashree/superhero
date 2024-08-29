import React, { useState } from "react";
import './Superhero.css';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { Button, Table, TableBody, TableCell, TableContainer, TableRow, Paper } from "@mui/material";
import video from './Images/Video.mp4';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';

const Superhero = () => {
    const [animate, setAnimate] = useState(false);
    const [name, setName] = useState("");
    const [superhero, setSuperhero] = useState(null);

    const handleAboutClick = () => {
        setAnimate(true);
        setTimeout(() => {
          setAnimate(false);
        }, 5000);
    };

    const handleSearch = () => {
        fetch(`https://www.superheroapi.com/api.php/10223569763528853/search/${name}`)
            .then(response => response.json())
            .then(data => {
                if (data.response === 'success') {
                    setSuperhero(data.results[0]);
                } else {
                    setSuperhero(null);
                    alert('Superhero not found');
                }
            })
            .catch(error => {
                console.error('Error fetching superhero:', error);
                setSuperhero(null);
                alert('An error occurred while fetching the superhero data');
            });
    };

    const renderTable = (data) => (
      <TableContainer component={Paper} className="table-container">
        <Table>
          <TableBody>
            {Object.keys(data).map((key) => (
              <TableRow key={key}>
                <TableCell>{key}</TableCell>
                <TableCell>{Array.isArray(data[key]) ? data[key].join(' / ') : data[key]}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );

    return (
        <>
            <div className="video-background">
                <video className="video" autoPlay loop muted>
                    <source src={video} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
                <div className="content">
                    <Button variant="contained" endIcon={<KeyboardDoubleArrowDownIcon />} size="large"><a href='#START' className="nav-link" onClick={handleAboutClick}>Get Started</a></Button>
                </div>
            </div>
            <div className="shero" id="START">
            <div
            style={{
              animation: animate ? 'slideUp 3s' : 'none',
            }}
          >
                <Box
                    component="form"
                    sx={{
                        '& > :not(style)': { m: 1 },
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <TextField id="outlined-basic" label="Enter any Super Hero Name" variant="outlined" fullWidth onChange={(e) => setName(e.target.value)}/>
                </Box>
                <Button variant="contained" onClick={handleSearch}>Search</Button>
                </div>
                {superhero && (
                    <div className="main-content">
                        <div className="left">
                            <h1>{superhero.name}</h1>
                            <img src={superhero.image.url} alt={superhero.name} className="superhero-image" />
                        </div>
                        <div className="right">
                            <h2>Powerstats</h2>
                            {renderTable(superhero.powerstats)}
                            <h2>Biography</h2>
                            {renderTable(superhero.biography)}
                            <h2>Appearance</h2>
                            {renderTable(superhero.appearance)}
                            <h2>Work</h2>
                            {renderTable(superhero.work)}
                            <h2>Connections</h2>
                            {renderTable(superhero.connections)}
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}

export default Superhero;