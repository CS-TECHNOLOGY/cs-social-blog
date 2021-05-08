import {
  Avatar,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  makeStyles,
} from "@material-ui/core";
import LanguageIcon from "@material-ui/icons/Language";
import React from "react";
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
}));
const Conversations = (props) => {
  const classes = useStyles();
  return (
    <List>
      <ListItem
        classes={{ root: classes.subheader }}
        onClick={() => {
          props.setScope("Global Chat");
        }}
      >
        <ListItemAvatar>
          <Avatar className={classes.globe}>
            <LanguageIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText className={classes.subheaderText} primary="Global Chat" />
      </ListItem>
      <Divider />

      {/* {conversations && ( */}
      <React.Fragment>
        {/* {conversations.map((c) => ( */}
        <ListItem
          className={classes.listItem}
          //   key={c._id}
          button
          //   onClick={() => {
          //     props.setUser(handleRecipient(c.recipientObj));
          //     props.setScope(handleRecipient(c.recipientObj).name);
          //   }}
        >
          <ListItemAvatar>
            <Avatar>
              {/* {commonUtilites.getInitialsFromName(
                handleRecipient(c.recipientObj).name
              )} */}
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            primary={"handleRecipient(c.recipientObj).name"}
            secondary={<React.Fragment>{"c.lastMessage"}</React.Fragment>}
          />
        </ListItem>
        {/* ))} */}
      </React.Fragment>
      {/* )} */}
    </List>
  );
};

export default Conversations;
