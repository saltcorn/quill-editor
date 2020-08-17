const { input, div, text, script, domReady } = require("@saltcorn/markup/tags");

const headers= [
  {
    script:
      "https://cdn.quilljs.com/1.3.6/quill.min.js"
    //integrity: "sha256-qXgZ3jy1txdNZG0Lv20X3u5yh4892KqFcfF1SaOW0gI="
  },
  {
    script:
      "https://cdn.jsdelivr.net/npm/quillgethtml@0.0.6/quillgethtml.js",
    integrity: "sha256-u5C0kZWZFGdNhqwNf/a9UVNp+WoKmhhtH+cQviSm30M="
  },
  {
    css: "https://cdn.quilljs.com/1.3.6/quill.snow.css"
  }
]

const Quill = {
  type: "HTML",
  isEdit: true,
  run: (nm, v, attrs, cls) =>div( {
        class: [cls]},
    div(
     {
        id: `quill__${text(nm)}`,
      },
      v || ""
    ),
    input({type:"hidden", name: text(nm)}),
    script(domReady(`
    var quill = new Quill('#quill__${text(nm)}', {
      theme: 'snow'
    });

    var the_form=$('#quill__${text(nm)}').parents('form')
    the_form.submit(function() {
      var hidden_in = document.querySelector('input[name=${text(nm)}]');
      var html=quill.getHTML()
      hidden_in.value= html
      console.log("html", html);

    })`))
  )
};


module.exports = { sc_plugin_api_version: 1, fieldviews: {Quill}, headers };
