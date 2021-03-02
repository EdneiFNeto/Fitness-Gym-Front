import React from 'react';
import Paper from '@material-ui/core/Paper';
import { ViewState } from '@devexpress/dx-react-scheduler';
import {
  Scheduler,
  WeekView,
  Appointments,
  AllDayPanel
} from '@devexpress/dx-react-scheduler-material-ui';

import { AppointmentTooltip } from '@devexpress/dx-react-scheduler-material-ui';


import IconButton from '@material-ui/core/IconButton';
import MoreIcon from '@material-ui/icons/MoreVert';
import Grid from '@material-ui/core/Grid';
import Room from '@material-ui/icons/Room';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'clsx';

const style = ({ palette }) => ({
    icon: {
      color: palette.action.active,
    },
    textCenter: {
      textAlign: 'center',
    },
    firstRoom: {
      background: 'url(https://js.devexpress.com/Demos/DXHotels/Content/Pictures/Lobby-4.jpg)',
    },
    secondRoom: {
      background: 'url(https://js.devexpress.com/Demos/DXHotels/Content/Pictures/MeetingRoom-4.jpg)',
    },
    thirdRoom: {
      background: 'url(https://js.devexpress.com/Demos/DXHotels/Content/Pictures/MeetingRoom-0.jpg)',
    },
    header: {
      height: '260px',
      backgroundSize: 'cover',
    },
    commandButton: {
      backgroundColor: 'rgba(255,255,255,0.65)',
    },
  });
  
  const getClassByLocation = (classes, location) => {
    if (location === 'Room 1') return classes.firstRoom;
    if (location === 'Room 2') return classes.secondRoom;
    return classes.thirdRoom;
  };
  
  const Header = withStyles(style, { name: 'Header' })(({
    children, appointmentData, classes, ...restProps
  }) => (
    <AppointmentTooltip.Header
      {...restProps}
      className={classNames(getClassByLocation(classes, appointmentData.location), classes.header)}
      appointmentData={appointmentData}
    >
      <IconButton
        /* eslint-disable-next-line no-alert */
        onClick={() => alert(JSON.stringify(appointmentData))}
        className={classes.commandButton}
      >
        <MoreIcon />
      </IconButton>
    </AppointmentTooltip.Header>
  ));
  
  const Content = withStyles(style, { name: 'Content' })(({
    children, appointmentData, classes, ...restProps
  }) => (
    <AppointmentTooltip.Content {...restProps} appointmentData={appointmentData}>
      <Grid container alignItems="center">
        <Grid item xs={2} className={classes.textCenter}>
          <Room className={classes.icon} />
        </Grid>
        <Grid item xs={10}>
          <span>{appointmentData.location}</span>
        </Grid>
      </Grid>
    </AppointmentTooltip.Content>
  ));
  
  const CommandButton = withStyles(style, { name: 'CommandButton' })(({
    classes, ...restProps
  }) => (
    <AppointmentTooltip.CommandButton {...restProps} className={classes.commandButton} />
  ));


const Appointment = ({
    children, style, ...restProps}) => (

    <Appointments.Appointment
      {...restProps}
      style={{
        ...style,
        width:'100px',
        backgroundColor: 'blueviolet',
        borderRadius: '8px',
      }}
    >
    {children}
    </Appointments.Appointment>
  );
  
  
function Calendar(props) {

    return(
      <>
        <Paper>
          <Scheduler
          data={props.data}
          height={660}>

            <ViewState
              defaultCurrentDate={props.defaultCurrentDate} />
            
            <WeekView
              startDayHour={9} //start hour
              endDayHour={22} //hour final
            />

            <Appointments 
              appointmentComponent={Appointment}/>
            
            <AppointmentTooltip
              showCloseButton
              headerComponent={Header}
              contentComponent={Content}
              commandButtonComponent={CommandButton} />

            <AllDayPanel />
          </Scheduler>
        </Paper>
      </>
    )
}

export default Calendar;