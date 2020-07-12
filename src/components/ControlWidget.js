import React, { useContext } from 'react'
import { withStyles } from '@material-ui/core/styles'
// import { withStyles, makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import { Grid, Slider } from '@material-ui/core';
import PlayCircleOutlineSharpIcon from '@material-ui/icons/PlayCircleOutlineSharp';
import LoopSharpIcon from '@material-ui/icons/LoopSharp';

import DataContext from '../contexts/DataContext'

const ControlWidget = ({ algo } ) => {
  const { data, createData, dataSize, setDataSize, isRunning, animationsOn, setAnimationsOn } = useContext(DataContext)

  const handleChange = e => {
    setDataSize(+e.target.textContent)
    createData(+e.target.textContent)
  }

  const setAnimations = () => animationsOn ? setAnimationsOn(false): setAnimationsOn(true)

  const DataSizeSlider = withStyles({
    root: {
      color: '#02203c',
      height: 8,
      width: 150,
      "&$disabled": {
        // color: "#02203c",
        // marginBottom: -2,
        // marginLeft: -12,
      },

    },
    thumb: {
      height: 20,
      width: 20,
      backgroundColor: '#fff',
      border: '2px solid currentColor',
      marginTop: -7,
      marginLeft: -12,
      '&:focus, &:hover, &$active': {
        boxShadow: 'inherit',
      },
    },
    active: {},
    disabled: {
      color: '#02203c',
    },
    valueLabel: {
      left: 'calc(-50%)',
    },
    track: {
      height: 6,
      borderRadius: 4,
    },
    rail: {
      height: 6,
      borderRadius: 4,
    },

  })(Slider)
  // const tween = {
  //   type: "tween",
  //   damping: 500,
  //   stiffness: 500,
  //   duration: 0.1,
  // }

  return (
    <div style={{ marginTop: '20px' }}>
      <Grid container spacing={2} alignItems='center' justify='center'>
        <Grid item>
          <Button color='#02203c' ><LoopSharpIcon fontSize='large' color='#02203c' onClick={createData}>New Array</LoopSharpIcon></Button>
        </Grid>
        {data.length > 0 &&
          <>
            <Grid item>
              <Button color='#02203c' disabled={isRunning}><PlayCircleOutlineSharpIcon size='small' fontSize='large' color='inherit' onClick={algo}></PlayCircleOutlineSharpIcon></Button>
            </Grid>
            <Grid item>
              <div style={{ fontWeight: 'bold' }}>25</div>
            </Grid>
            <Grid item>
                <DataSizeSlider disabled={isRunning} onMouseUp={handleChange} defaultValue={dataSize} step={15} min={25} max={100} valueLabelDisplay="auto"/>
            </Grid>
            <Grid item>
              <div style={{ fontWeight: 'bold' }}>100</div>
            </Grid>
            <Grid item>
              <Button color='#02203c' ><PlayCircleOutlineSharpIcon size='small' fontSize='large' color='inherit' onClick={setAnimations}></PlayCircleOutlineSharpIcon></Button>
            </Grid>
          </>
        }
      </Grid>
    </div>
  )
}

export default ControlWidget
