import React, { useCallback, useMemo, useState, useRef } from 'react'
import ReactEcharts from 'echarts-for-react'
import {
  AppBar,
  Container,
  CssBaseline,
  Grid,
  Paper,
  Toolbar,
  Typography,
  Tabs,
  Tab,
  InputBase,
  Button,
  ButtonBase,
  Collapse,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions
} from '@material-ui/core'
import {
  SearchOutlined,
  CloseOutlined
} from '@material-ui/icons'
import { makeStyles, createMuiTheme, ThemeProvider } from '@material-ui/core/styles'

import getMainChartOptions from './mainChart'
import moodChartOptions from './moodChart'
import moodChartPersonalOps from './moodChartPersonal'
import personalChartOptions from './personalChart'
import allNames from './names.json'
import avatar from './avatar.png'

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#063d54',
      light: '#3c6781',
      dark: '#00172b',
      contrastText: '#fff',
    },
    secondary: {
      main: '#f39f03',
      light: '#ffd049',
      dark: '#bb7100',
      contrastText: '#000',
    }
  },
})

const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(3)
  },
  dualCardContainer: {
    position: 'relative'
  },
  paper: {
    padding: theme.spacing(1)
  },
  collapse: {
    position: 'absolute',
    top: theme.spacing(2) / 2,
    width: `calc(100% - ${theme.spacing(2)}px)`
  },
  fuckPaper: {
    padding: `${theme.spacing(2)}px ${theme.spacing(3)}px`,
  },
  piePaper: {
    padding: `${theme.spacing(2)}px ${theme.spacing(3)}px`,
    '& p': {
      marginBottom: -theme.spacing(3),
    }
  },
  personCard: {
    height: 650 + theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    '& .total': {
      // marginTop: theme.spacing(2)
    }
  },
  profileCard: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
    alignItems: 'center',
    justifyContent: 'flex-start',
    '& .back': {
      alignSelf: 'end',
      marginBottom: theme.spacing(3),
    },
    '& .avatar': {
      marginBottom: theme.spacing(1),
    },
    '& .info': {
      marginTop: theme.spacing(5),
      '& p': {
        marginBottom: theme.spacing(3),
      },
    },
  },
  mainChartCard: {
    height: 400,
  },
  secondaryChartCard: {
    height: 250,
  },
  search: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    display: 'flex',
    justifyContent: 'center',
  },
  searchField: {
    backgroundColor: '#F0F0F0',
    borderRadius: 18,
    paddingLeft: '1rem',
    paddingRight: '1rem'
  },
  searchButton: {
    padding: 6,
    minWidth: 'unset',
    borderRadius: '50%',
    marginLeft: '1rem'
  },
  avatatView: {
    flex: 1,
    overflow: 'auto',
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    '&::-webkit-scrollbar': {

    }
  },
  avatar: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    width: '100%',
    alignItems: 'center',
    flexDirection: 'column',
    transition: 'box-shadow .3s',
    '&:hover': {
      boxShadow: theme.shadows[6]
    },
  },
  statistic: {
    fontSize: 72,
    fontWeight: 'lighter',
    textAlign: 'center',
    '& span': {
      color: 'red'
    }
  },
  staticticTitle: {
    marginBottom: theme.spacing(3),
  },
  title: {
    '&:focus': {
      outline: 'none'
    }
  }
}))

export default () => {
  const classes = useStyles();
  const [mainChartTab, setMainChartTab] = useState(0)
  const [names, setNames] = useState(allNames)
  const [selectedProfile, setSelectedProfile] = useState(null)
  const [modalOpen, setModalOpen] = useState(true)
  const $searchEl = useRef(null)

  const handleMainChartTabChange = useCallback((event, value) => setMainChartTab(value), [])

  const handleSearch = useCallback(() => {
    const value = $searchEl.current.children[0].value.toLowerCase()
    if (!value) setNames(allNames)
    else setNames(allNames.filter(({ Name }) => Name.toLowerCase().startsWith(value)))
  }, [])

  const handleClear = useCallback(() => {
    setNames(allNames)
  }, [])

  const handleNameClick = useCallback((event) => {
    const idx = event.currentTarget.dataset.idx
    setSelectedProfile(allNames[idx])
  }, [])

  const handleBackClick = useCallback(() => {
    $searchEl.current.children[0].value = ''
    setSelectedProfile(null)
  }, [])

  const handleModalClose = useCallback(() => {
    setModalOpen(false)
  }, [])

  const handleModalOpenByKey = useCallback((e) => {
    console.log(e.key, modalOpen)
    if (e.key === 'x' && !modalOpen) {
      setModalOpen(true)
    }
  }, [modalOpen])

  const mainChartOptions = useMemo(() => getMainChartOptions(selectedProfile ? 2 : 1, mainChartTab), [selectedProfile, mainChartTab])

  const peoplePaper = useMemo(() => (
    <Paper className={`${classes.paper} ${classes.personCard}`}>
      <div className={classes.search}>
        <InputBase ref={$searchEl} className={classes.searchField} placeholder="Search" />
        <Button variant="contained" color="primary" className={classes.searchButton} onClick={handleSearch}>
          <SearchOutlined />
        </Button>
        <Button variant="contained" className={classes.searchButton} onClick={handleClear}>
          <CloseOutlined />
        </Button>
      </div>
      <Grid container className={classes.avatatView}>
        {
          names.map(({ Name }, idx) => (
            <Grid item xs={4} key={Name}>
              <ButtonBase className={classes.avatar} focusRipple data-idx={idx} onClick={handleNameClick}>
                <img style={{ width: 40, height: 'auto' }} src={avatar} alt="avatar"/>
                <Typography variant="caption" align="center" display="block">{Name}</Typography>
              </ButtonBase>
            </Grid>
          ))
        }
      </Grid>
      <Typography className="total" variant="caption" display="block" align="center" color="textSecondary">
        {names.length} Students
      </Typography>
    </Paper>
  ), [classes.avatar, classes.avatatView, classes.paper, classes.personCard, classes.search, classes.searchButton, classes.searchField, handleClear, handleNameClick, handleSearch, names])

  const profilePaper = useMemo(() => (
    <Paper className={`${classes.paper} ${classes.personCard} ${classes.profileCard}`} elevation={0}>
      <Button color="primary" className="back" onClick={handleBackClick}>&lt;&nbsp;Back</Button>
      <img src={avatar} alt="avatar" className="avatar" />
      <Typography variant="h5" component="div">{selectedProfile?.Name}</Typography>
      <div className="info">
      {
        selectedProfile && Object.entries(selectedProfile).map(([ key, val ]) => (
          <Typography key={key}><b>{key}:&nbsp;</b>{val}</Typography>
        ))
      }
      <Typography><b>Content Delivery:&nbsp;</b><span style={{ color: 'red' }}>53%</span></Typography>
      <Typography><b>Interest:&nbsp;</b><span style={{ color: 'green' }}>71%</span></Typography>
      </div>
    </Paper>
  ), [classes.paper, classes.personCard, classes.profileCard, handleBackClick, selectedProfile])

  const fuckPaper = useMemo(() => (
    <Paper className={`${classes.fuckPaper} ${classes.secondaryChartCard}`}>
      <Typography className={classes.staticticTitle}>Compared to last month, students' attention during class improved by</Typography>
      <div className={classes.statistic}>
        10% <span>↑</span>
      </div>
    </Paper>
  ), [classes.fuckPaper, classes.secondaryChartCard, classes.staticticTitle, classes.statistic])

  const shitPaper = useMemo(() => (
    <Paper className={`${classes.piePaper} ${classes.secondaryChartCard}`} elevation={0}>
      <Typography>
        {selectedProfile ? `${selectedProfile.Name}'s c` : 'C'}oncentration
      </Typography>
      <ReactEcharts style={{ height: '100%' }} option={personalChartOptions} lazyUpdate={true} />
    </Paper>
  ), [classes.piePaper, classes.secondaryChartCard, selectedProfile])

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="sticky">
        <Toolbar>
          <Typography variant="h6" component="h1" className={classes.title} tabIndex={1} onKeyDown={handleModalOpenByKey}>
            MoniCam Dashboard
          </Typography>
        </Toolbar>
      </AppBar>
      <Container fixed className={classes.container}>
        <Grid container spacing={2}>
          <Grid item xs={4} className={classes.dualCardContainer}>
            {peoplePaper}
            <Collapse in={!!selectedProfile} className={classes.collapse}>
              {profilePaper}
            </Collapse>
          </Grid>
          <Grid item xs={8} container spacing={2}>
            <Grid item xs={12}>
              <Paper className={`${classes.paper} ${classes.mainChartCard}`}>
                <Tabs value={mainChartTab} onChange={handleMainChartTabChange} centered>
                  <Tab label="Attention"/>
                  <Tab label="Emotion"/>
                </Tabs>
                <ReactEcharts style={{ height: 'calc(100% - 48px)' }} option={mainChartOptions} lazyUpdate={true}/>
              </Paper>
            </Grid>
            <Grid item xs={6} className={classes.dualCardContainer}>
              {fuckPaper}
              <Collapse in={!!selectedProfile} className={classes.collapse}>
                {shitPaper}
              </Collapse>
            </Grid>
            <Grid item xs={6}>
              <Paper className={`${classes.piePaper} ${classes.secondaryChartCard}`}>
                <Typography>
                  {selectedProfile ? `${selectedProfile.Name}'s c` : 'C'}omposition of emotions
                </Typography>
                <ReactEcharts style={{ height: '100%' }} option={selectedProfile ? moodChartPersonalOps : moodChartOptions} lazyUpdate={true} />
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </Container>

      <Dialog open={modalOpen} onClose={handleModalClose}>
        <DialogTitle>Disclaimer</DialogTitle>
        <DialogContent>
          <DialogContentText>
            The videos captured by MoniCam are strictly confidential, and are used for internal model training only. We use appropriate technical and organizational security measures to protect stored personal data against external manipulation, partial or total loss, and unauthorized access by third parties. Our security measures are continually upgraded as technology advances. Under no circumstances should the videos be shared with any third party without the prior written consent of MoniCam.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleModalClose} color="primary">
            Disagree
          </Button>
          <Button onClick={handleModalClose} color="primary">
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </ThemeProvider>
  )
}