import Button from "@mui/material/Button";

function DualButton(props) {
  return (
    <div>
      <Button
        sx={{ mt: 2, mr: 1 }}
        variant="outlined"
        color={props.color}
        onClick={props.firstButtonAction}
      >
        {props.firstButtonText}
      </Button>
      <Button
        sx={{ mt: 2 }}
        variant="contained"
        color={props.color}
        onClick={props.secondButtonAction}
      >
        {props.secondButtonText}
      </Button>
    </div>
  );
}

export default DualButton;
