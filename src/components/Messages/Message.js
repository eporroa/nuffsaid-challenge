import React from "react";
import classNames from "classnames";

import { Box, Card, CardHeader, IconButton } from "@material-ui/core";
import { DeleteOutlined } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";
import { useMessages } from "./messagesContext";

const styles = makeStyles({
  error: {
    backgroundColor: "#F56236",
  },
  warning: {
    backgroundColor: "#FCE788",
  },
  info: {
    backgroundColor: "#88FCA3",
  },
});

export default function Message({ message, ...props }) {
  const classes = styles();
  const { removeMessage } = useMessages();
  const priority = message.priority;

  return (
    <Box {...props} mb={2}>
      <Card
        className={classNames({
          [classes.error]: priority === 1,
          [classes.warning]: priority === 2,
          [classes.info]: priority === 3,
        })}
      >
        <CardHeader
          action={
            <IconButton onClick={() => removeMessage(message.id)}>
              <DeleteOutlined />
            </IconButton>
          }
          title={message.message}
        ></CardHeader>
      </Card>
    </Box>
  );
}
