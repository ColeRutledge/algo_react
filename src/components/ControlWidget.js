import React, { useContext } from 'react'
import { withStyles } from '@material-ui/core/styles'
// import { withStyles, makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import Slider from '@material-ui/core/Slider'
import PlayCircleOutlineSharpIcon from '@material-ui/icons/PlayCircleOutlineSharp';
import LoopSharpIcon from '@material-ui/icons/LoopSharp';

import DataContext from '../contexts/DataContext'

const ControlWidget = ({ algo } ) => {
  const { data, createData, dataSize, setDataSize, isRunning } = useContext(DataContext)


  // useEffect(() =>  {
  //   if (isRunning) {

  //   }
  // }, [isRunning])

  const handleChange = e => {
    setDataSize(+e.target.textContent)
    createData(+e.target.textContent)
  }

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

  return (
    <div style={{ marginTop: '35px' }}>
      <Grid container spacing={2} alignItems='center' justify='center'>
        <Grid item>
          <Button ><LoopSharpIcon fontSize='large' color="inherit" onClick={createData}>New Array</LoopSharpIcon></Button>
        </Grid>
        {data.length > 0 &&
          <>
            <Grid item>
              <Button disabled={isRunning}><PlayCircleOutlineSharpIcon size='small' fontSize='large' color="inherit" onClick={algo}>Sort!</PlayCircleOutlineSharpIcon></Button>
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
          </>
        }
      </Grid>
    </div>
  )
}

export default ControlWidget
