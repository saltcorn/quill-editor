const {
  input,
  div,
  text,
  script,
  domReady,
  style
} = require("@saltcorn/markup/tags");

const headers = [
  {
    script: "https://cdn.quilljs.com/1.3.6/quill.min.js"
  },
  {
    script:
      "https://cdn.jsdelivr.net/npm/quill-delta-to-html@0.12.0/dist/browser/QuillDeltaToHtmlConverter.bundle.js",
    integrity: "sha256-6BD0CamZAI2REr1TrHxX+3S9/aKCJvwzb2+T94GZUKM="
  },
  {
    css: "https://cdn.quilljs.com/1.3.6/quill.snow.css"
  }
];

const Quill = {
  type: "HTML",
  isEdit: true,
  run: (nm, v, attrs, cls) =>
    div(
      {
        class: [cls]
      },
      div(
        {
          id: `quill__${text(nm)}`
        },
        v || ""
      ),
      input({ type: "hidden", name: text(nm) }),
      style(".ql-editor strong{font-weight:bold;}"),
      script(
        domReady(`
    var quill = new Quill('#quill__${text(nm)}', {
      theme: 'snow'
    });
    var the_form=$('#quill__${text(nm)}').parents('form')
    the_form.submit(function() {
      var hidden_in = document.querySelector('input[name=${text(nm)}]');
      var delta = quill.getContents();
      var qdc = new window.QuillDeltaToHtmlConverter(delta.ops, {});
      var html = qdc.convert();
      hidden_in.value= html
    })`)
      )
    )
};

const dependencies = ["@saltcorn/html"];

module.exports = {
  sc_plugin_api_version: 1,
  fieldviews: { Quill },
  headers,
  dependencies
};
