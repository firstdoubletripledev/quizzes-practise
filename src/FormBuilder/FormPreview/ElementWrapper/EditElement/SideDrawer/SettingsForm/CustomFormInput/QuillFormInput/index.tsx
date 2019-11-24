import React, { forwardRef } from "react";
import ReactQuill, { Quill } from "react-quill";
import Tabs from "antd/es/tabs/index";
import Tooltip from "antd/es/tooltip/index";
import "react-quill/dist/quill.snow.css";
import "./quillFormInput.css";
import LocaleCode from "locale-code";

const getLanguageNativeName = LocaleCode.getLanguageNativeName;
const { TabPane } = Tabs;

const Size = Quill.import("attributors/style/size");
const text_size = [
  "6px",
  "7px",
  "8px",
  "9px",
  "10px",
  "10.5px",
  "11px",
  "12px",
  "13px",
  "14px",
  "15px",
  "16px",
  "18px",
  "20px",
  "22px",
  "24px",
  "26px",
  "28px",
  "32px",
  "36px",
  "40px",
  "44px",
  "48px",
  "54px",
  "60px",
  "66px",
  "72px",
  "80px",
  "88px",
  "96px"
];
Size.whitelist = text_size;
Quill.register(Size, true);

const modules = {
  toolbar: {
    container: [
      [{ header: [1, 2, false] }, { font: [] }, { size: text_size }],
      [{ color: [] }, { background: [] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" }
      ],
      ["link" /* 'image', 'video' */],
      ["clean"]
    ]
  }
};

export default forwardRef((props: any, ref) => {
  const { value, defaultValue, onChange, currentLanguage, setLanguage } = props,
    questionLanguages = Object.keys(value);
  // console.log("quill props", props);

  function onChangeHandler(
    content: string
    // delta: Quill.Delta,
    //  source: Quill.Sources,
    // editor: UnprivilegedEditor
  ) {
    // console.log("onchange", content);
    onChange({ ...value, [currentLanguage]: content });
  }

  return (
    <Tabs
      onChange={setLanguage}
      activeKey={currentLanguage}
      type="editable-card"
      // onEdit={this.onEdit} @TODO add/remove questions in multiple languages
    >
      {questionLanguages.map(lang => (
        <TabPane
          // native language name
          tab={<Tooltip title={lang}>{getLanguageNativeName(lang)}</Tooltip>}
          key={lang}
          closable
        >
          <ReactQuill
            theme="snow"
            placeholder="Question?"
            defaultValue={defaultValue}
            value={value[currentLanguage] || ""}
            onChange={onChangeHandler}
            modules={modules}
          />
        </TabPane>
      ))}
    </Tabs>
  );
});
