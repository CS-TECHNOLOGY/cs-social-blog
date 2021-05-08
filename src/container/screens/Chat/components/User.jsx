import { Avatar, List, ListItem, ListItemAvatar, ListItemText, makeStyles } from '@material-ui/core';
import React from 'react'
const useStyles = makeStyles((theme) => ({
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
    avatar: {
      margin: theme.spacing(0, 3, 0, 1),
    },
  }));
const User = () => {
    const classes = useStyles();
    return (
        <List>
          <React.Fragment>
              <ListItem
                className={classes.listItem}
                button
              >
                <ListItemAvatar className={classes.avatar}>
                  <Avatar>{"commonUtilites.getInitialsFromName(u.name)"}</Avatar>
                </ListItemAvatar>
                <ListItemText
            primary={"handleRecipient(c.recipientObj).name"}
            secondary={<React.Fragment>{"c.lastMessage"}</React.Fragment>}
          />
              </ListItem>
          </React.Fragment>
      </List>
    )
}

export default User
