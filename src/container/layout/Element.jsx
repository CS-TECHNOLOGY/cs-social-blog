import { Picker } from "emoji-mart";
import "emoji-mart/css/emoji-mart.css";
import React from "react";
const EmojiPicker = ({onClick = null }) => {
  return  <Picker onSelect={onClick} />;
};
export const EmojiPickerMemo = React.memo(
  EmojiPicker,
  (prev, next) => prev === next
);
