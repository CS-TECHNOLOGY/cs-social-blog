import React, { useRef, useState } from "react";
import { AtomicBlockUtils, Editor, EditorState } from "draft-js";
import { RichUtils } from "draft-js";
import "draft-js/dist/Draft.css";
function CSEditor() {
  const editorRef = useRef();
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const focus = () => {
    editorRef.current.focus();
  };
  const onBoldClick = (e) => {
    e.preventDefault(); // Mình dùng preventDefault() để giữ con trỏ chuột vẫn còn ở trong editor nhé các bạn
    setEditorState(RichUtils.toggleInlineStyle(editorState, "BOLD"));
  };
  const addImage = (e) => {
    e.preventDefault();
    const contentState = editorState.getCurrentContent();
    const contentStateWithEntity = contentState.createEntity(
      "image",
      "IMMUTABLE",
      {
        src:
          "https://scontent.fhan3-1.fna.fbcdn.net/v/t1.6435-9/56907659_393365341245567_78934828816269312_n.jpg?_nc_cat=109&ccb=1-3&_nc_sid=09cbfe&_nc_ohc=OhJYeQMwLewAX8OikWm&_nc_ht=scontent.fhan3-1.fna&oh=4a8097bdfcd522dff035ce6983af527c&oe=60BC6747",
      }
    );
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
    const newEditorState = EditorState.set(editorState, {
      currentContent: contentStateWithEntity,
    });
    setEditorState(
      AtomicBlockUtils.insertAtomicBlock(newEditorState, entityKey, " ")
    );
  };

  // Tiến hành render Image component trong editor
  const Image = ({ contentState, block }) => {
    const entity = contentState.getEntity(block.getEntityAt(0));
    const { src } = entity.getData();
    console.log(src);
    return <img src={src} />;
  };

  function mediaBlockRenderer(block) {
    if (block.getType() === "atomic") {
      return {
        component: Image,
        editable: false,
      };
    }

    return null;
  }
  return (
    <div className="cs-editor" onClick={focus}>
      <span onMouseDown={onBoldClick}>Bold</span>
      <button onClick={addImage}>img</button>
      <Editor
        blockRendererFn={mediaBlockRenderer}
        ref={editorRef}
        editorState={editorState}
        onChange={setEditorState}
      />
      <div className="cs-editor-tool">
      <i class="fi-rr-bold"></i>
      <i class="fi-rr-italic"></i>
      <i class="fi-rr-underline"></i>
      <i class="fi-rr-list"></i>
      </div>
    </div>
  );
}

export default CSEditor;
