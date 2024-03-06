import { TextareaAutosize as BaseTextareaAutosize } from "@mui/base/TextareaAutosize";
import { styled } from "@mui/system";

export default function TextArea(props) {
  const green = {
    100: "#A6FFD0",
    200: "#78FFB0",
    400: "#3AFF80",
    500: "#00D67E",
    600: "#00B56A",
    900: "#006D3F",
  };

  const grey = {
    50: "#F3F6F9",
    100: "#E5EAF2",
    200: "#DAE2ED",
    300: "#C7D0DD",
    400: "#B0B8C4",
    500: "#9DA8B7",
    600: "#6B7A90",
    700: "#434D5B",
    800: "#303740",
    900: "#1C2025",
  };

  const TextArea = styled(BaseTextareaAutosize)(
    ({ theme }) => `
    box-sizing: border-box;
    width: 100%;
    resize: none;
    font-family: 'IBM Plex Sans', sans-serif;
    font-size: 0.875rem;
    font-weight: 400;
    line-height: 1.5;
    padding: 8px 12px;
    border-radius: 8px;
    color: ${"#e0e0e0"};
    background: ${"#31313d"};
    border: 1px solid ${grey[200]};
    box-shadow: 0px 1px 1px ${grey[50]};

    &:hover {
      border-color: ${green[400]};
    }

    &:focus {
      border-color: ${green[400]};
      box-shadow: 0 0 0 3px ${green[500]};
    }

    // firefox
    &:focus-visible {
      outline: 0;
    }
  `
  );

  return (
    <TextArea
      name="review"
      aria-label="text area"
      minRows={3}
      placeholder="Add your review..."
      value={props.value}
      onChange={props.onChange}
    />
  );
}
