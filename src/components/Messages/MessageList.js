import { useState, useEffect, useCallback } from "react";
import { Box, Container, Grid, Button } from "@material-ui/core";

import API from "../../api";
import { useMessages } from "./messagesContext";
import ErrorsSnackbar from "../ErrorsSnackbar";
import MessageColumn from "./MessageColumn";


export default function MessageList() {
  const { setAPI, startAPI, stopAPI, messages, clearAllMessages, addMessage } =
    useMessages();
  const [isStarted, setIsStarted] = useState(true);

  useEffect(() => {
    setAPI(
      new API({
        messageCallback: (message) => {
          addMessage({ ...message, id: new Date().getTime() });
        },
      })
    );

    startAPI();
    setIsStarted(true);
    return () => stopAPI();
  }, []);

  const handleToggleControl = useCallback(() => {
    if (isStarted) {
      stopAPI();
    } else {
      startAPI();
    }
    setIsStarted(!isStarted);
  }, [isStarted]);

  const groupedMessages = messages.reduce(
    (grouped, message) => {
      if (!grouped[message.priority]) {
        grouped[message.priority] = [];
      }
      grouped[message.priority].push(message);
      return grouped;
    },
    { 1: [], 2: [], 3: [] }
  );

  return (
    <>
      {groupedMessages["1"] && <ErrorsSnackbar errors={groupedMessages["1"]} />}
      <Container>
        <Box my={5}>
          <Grid container>
            <Grid item md={12} align="center">
              <Button variant="contained" onClick={handleToggleControl}>
                {isStarted ? "Stop Messages" : "Start Messages"}
              </Button>{" "}
              <Button
                data-testid="clear_all"
                color="secondary"
                variant="outlined"
                disabled={messages.length === 0}
                onClick={() => clearAllMessages()}
              >
                Clear all
              </Button>
            </Grid>
          </Grid>
        </Box>
        <Box my={5}>
          <Grid container direction="row" spacing={3}>
            <MessageColumn
              title="Error Type 1"
              type="error"
              data={groupedMessages["1"]?.reverse()}
            />
            <MessageColumn
              title="Warning Type 2"
              type="warning"
              data={groupedMessages["2"]?.reverse()}
            />
            <MessageColumn
              title="Info Type 3"
              type="info"
              data={groupedMessages["3"]?.reverse()}
            />
          </Grid>
        </Box>
      </Container>
    </>
  );
}
