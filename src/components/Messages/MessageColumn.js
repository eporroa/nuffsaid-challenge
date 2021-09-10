import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Grow from "@material-ui/core/Grow";
import Message from "./Message";

export default function MessageColumn({ data, title }) {
  const count = data.length;

  return (
    <Grid item lg={4}>
      <Typography variant="h5" component="h5">
        {title}
      </Typography>
      <Typography variant="body2" component="p">
        Count:{count}
      </Typography>
      <Box mt={2} flexWrap="nowrap">
        {data.map((message, index) => (
          <div key={message.id}>
            {index === 0 && (
              <Grow in={index === 0}>
                <Message message={message} />
              </Grow>
            )}
            {index !== 0 && <Message message={message} />}
          </div>
        ))}
      </Box>
    </Grid>
  );
}
