const {
  input,
  div,
  text,
  script,
  domReady,
  style,
  text_attr,
} = require("@saltcorn/markup/tags");

const headers = [
  {
    script: "https://cdn.quilljs.com/1.3.6/quill.min.js",
  },
  {
    script:
      "https://cdn.jsdelivr.net/npm/quill-delta-to-html@0.12.0/dist/browser/QuillDeltaToHtmlConverter.bundle.js",
    integrity: "sha256-6BD0CamZAI2REr1TrHxX+3S9/aKCJvwzb2+T94GZUKM=",
  },
  {
    css: "https://cdn.quilljs.com/1.3.6/quill.snow.css",
  },
];

const Quill = {
  type: "HTML",
  isEdit: true,
  run: (nm, v, attrs, cls) => {
    const rnd_id = `map${Math.round(Math.random() * 100000)}`;

    return div(
      {
        class: [cls],
      },
      div(
        {
          id: `quill_${text(nm)}_${rnd_id}`,
        },
        v || ""
      ),
      input({
        type: "hidden",
        name: text(nm),
        value: v ? text_attr(v) : undefined,
      }),
      style(".ql-editor strong{font-weight:bold;}"),
      script(
        domReady(`
    var quill = new Quill('#quill_${text(nm)}_${rnd_id}', {
      theme: 'snow'
    });
    var the_form=$('#quill_${text(nm)}_${rnd_id}').parents('form')

    the_form.find('input[name=${text(nm)}]').on('set_form_field', (e)=>{
      $('#quill_${text(nm)}_${rnd_id} .ql-editor').html(e.target.value)
    })
    function copyToHidden() {
      var hidden_in = the_form.find('input[name=${text(nm)}]');
      var delta = quill.getContents();
      var qdc = new window.QuillDeltaToHtmlConverter(delta.ops, {});
      var html = qdc.convert();
      hidden_in.val(html)
    }
    quill.on('text-change',  $.debounce ? $.debounce(function() {
      copyToHidden();
      the_form.trigger('change')
    }, 500, null,true) : copyToHidden )
    the_form.submit(copyToHidden)`)
      )
    );
  },
};

const dependencies = ["@saltcorn/html"];

module.exports = {
  sc_plugin_api_version: 1,
  fieldviews: { Quill },
  headers,
  dependencies,
};
