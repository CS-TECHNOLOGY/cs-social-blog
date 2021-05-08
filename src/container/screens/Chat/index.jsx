import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ListItem from "@material-ui/core/ListItem";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import { Grid, Paper, Tab, Tabs } from "@material-ui/core";
import { useState } from "react";
import Conversations from "./components/Conversations";
import User from "./components/User";
import ChatBox from "./components/ChatBox";

export default function ChatZone() {
  const classes = useStyles();
  const [tab, setTab] = useState(0);
  const handleChange = (e, newVal) => {
    setTab(newVal);
  };
  return (
    <div className={classes.root + " cs-chatroom"}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Mini variant drawer
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" classes={{ paper: "cs-side" }}>
        <div className={classes.toolbar} />
        <Divider />
        <List>
          {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
            <ListItem button key={text}>
              {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {["All mail", "Trash", "Spam"].map((text, index) => (
            <ListItem button key={text}>
              {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
            </ListItem>
          ))}
        </List>
      </Drawer>
      <main>
        <div className={classes.toolbar} />
        <Grid>
          <Grid item md={4} className={classes.sidebar}>
            <Paper className={classes.paper} square elevation={5}>
              <Paper square>
                <Tabs
                  onChange={handleChange}
                  variant="fullWidth"
                  value={tab}
                  indicatorColor="primary"
                  textColor="primary"
                >
                  <Tab label="Chats" />
                  <Tab label="Users" />
                </Tabs>
              </Paper>
              <div className="tab-contain">
                {tab === 0 && <Conversations />}
                {tab === 1 && <User />}
              </div>
            </Paper>
          </Grid>
          <Grid item md={8}>
            <ChatBox />
          </Grid>
        </Grid>
      </main>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  toolbar: theme.mixins.toolbar,
  paper: {
    minHeight: "calc(100vh - 64px)",
    borderRadius: 0,
  },
  sidebar: {
    zIndex: 8,
  },
  subheader: {
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
  },
  globe: {
    backgroundColor: theme.palette.primary.dark,
  },
  subheaderText: {
    color: theme.palette.primary.dark,
  },
}));
