import { Icon } from "@iconify/react/dist/iconify.js";
import { useRef, useState } from "react";
import ReactQuill from "react-quill-new";

const EditContestLayer = () => {
  const quillRef = useRef(null);
  const [value, setValue] = useState(``);
  const [isHighlightReady, setIsHighlightReady] = useState(false);
  const [imagePreviewUrl, setImagePreviewUrl] = useState("");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Quill editor modules with syntax highlighting (only load if highlight.js is ready)
  const modules = isHighlightReady
    ? {
        syntax: {
          highlight: (text) => hljs?.highlightAuto(text).value, // Enable highlight.js in Quill
        },
        toolbar: {
          container: "#toolbar-container", // Custom toolbar container
        },
      }
    : {
        toolbar: {
          container: "#toolbar-container", // Custom toolbar container
        },
      };

  const formats = [
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "color",
    "background",
    "script",
    "header",
    "blockquote",
    "code-block",
    "list",
    "indent",
    "direction",
    "align",
    "link",
    "image",
    "video",
    "formula",
  ];
  return (
    <div className="card h-100 p-0 radius-12">
      <div className="card-body p-24">
        <div className="row justify-content-center">
          <div className="col-xxl-6 col-xl-8 col-lg-10">
            <div className="card border">
              <div className="card-body">
                <h6 className="text-md text-primary-light mb-16">
                  Contest Logo
                </h6>
                {/* Upload Image Start */}
                <div className="mb-24 mt-16">
                  <div className="avatar-upload">
                    <div className="avatar-edit position-absolute bottom-0 end-0 me-24 mt-16 z-1 cursor-pointer">
                      <input
                        type="file"
                        id="imageUpload"
                        accept=".png, .jpg, .jpeg"
                        hidden
                        onChange={handleImageChange}
                      />
                      <label
                        htmlFor="imageUpload"
                        className="w-32-px h-32-px d-flex justify-content-center align-items-center bg-primary-50 text-primary-600 border border-primary-600 bg-hover-primary-100 text-lg rounded-circle"
                      >
                        <Icon
                          icon="solar:camera-outline"
                          className="icon"
                        ></Icon>
                      </label>
                    </div>
                    <div className="avatar-preview">
                      <div
                        id="imagePreview"
                        style={{
                          backgroundImage: imagePreviewUrl
                            ? `url(${imagePreviewUrl})`
                            : "",
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
                {/* Upload Image End */}
                <form action="#">
                  {/* Contest Name */}
                  <div className="mb-20">
                    <label
                      htmlFor="name"
                      className="form-label fw-semibold text-primary-light text-sm mb-8"
                    >
                      Contest Name <span className="text-danger-600">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control radius-8"
                      id="name"
                      placeholder="Enter Contest Name"
                    />
                  </div>
                  {/* Description */}
                  <div>
                    <label className="form-label fw-bold text-neutral-900">
                      Contest Description
                    </label>
                    <div className="border border-neutral-200 radius-8 overflow-hidden">
                      <div className="height-200">
                        {/* Toolbar */}
                        <div id="toolbar-container">
                          <span className="ql-formats">
                            <select className="ql-font"></select>
                            <select className="ql-size"></select>
                          </span>
                          <span className="ql-formats">
                            <button className="ql-bold"></button>
                            <button className="ql-italic"></button>
                            <button className="ql-underline"></button>
                            <button className="ql-strike"></button>
                          </span>
                          <span className="ql-formats">
                            <select className="ql-color"></select>
                            <select className="ql-background"></select>
                          </span>
                          <span className="ql-formats">
                            <button className="ql-script" value="sub"></button>
                            <button
                              className="ql-script"
                              value="super"
                            ></button>
                          </span>
                          <span className="ql-formats">
                            <button className="ql-header" value="1"></button>
                            <button className="ql-header" value="2"></button>
                            <button className="ql-blockquote"></button>
                            <button className="ql-code-block"></button>
                          </span>
                          <span className="ql-formats">
                            <button
                              className="ql-list"
                              value="ordered"
                            ></button>
                            <button className="ql-list" value="bullet"></button>
                            <button className="ql-indent" value="-1"></button>
                            <button className="ql-indent" value="+1"></button>
                          </span>
                          <span className="ql-formats">
                            <button
                              className="ql-direction"
                              value="rtl"
                            ></button>
                            <select className="ql-align"></select>
                          </span>
                          <span className="ql-formats">
                            <button className="ql-link"></button>
                            <button className="ql-image"></button>
                            <button className="ql-video"></button>
                            <button className="ql-formula"></button>
                          </span>
                          <span className="ql-formats">
                            <button className="ql-clean"></button>
                          </span>
                        </div>

                        {/* Editor */}
                        <ReactQuill
                          ref={quillRef}
                          theme="snow"
                          value={value}
                          onChange={setValue}
                          modules={modules}
                          formats={formats}
                          placeholder="Compose an epic..."
                        />
                      </div>
                    </div>
                  </div>
                  {/* Website Url */}
                  <div className="mb-20">
                    <label
                      htmlFor="websiteUrl"
                      className="form-label fw-semibold text-primary-light text-sm mb-8"
                    >
                      Website URL
                    </label>
                    <input
                      name="url"
                      type="url"
                      className="form-control radius-8"
                      id="websiteUrl"
                      placeholder="Enter Website URL"
                    />
                  </div>
                  {/* Client Name */}
                  <div className="mb-20">
                    <label
                      htmlFor="clientName"
                      className="form-label fw-semibold text-primary-light text-sm mb-8"
                    >
                      Client Name <span className="text-danger-600">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control radius-8"
                      id="clientName"
                      placeholder="Enter client Name"
                    />
                  </div>
                  {/* Client Email */}
                  <div className="mb-20">
                    <label
                      htmlFor="email"
                      className="form-label fw-semibold text-primary-light text-sm mb-8"
                    >
                      Client Email <span className="text-danger-600">*</span>
                    </label>
                    <input
                      type="email"
                      className="form-control radius-8"
                      id="email"
                      placeholder="Enter client address"
                    />
                  </div>
                  {/* Client Phone */}
                  <div className="mb-20">
                    <label
                      htmlFor="number"
                      className="form-label fw-semibold text-primary-light text-sm mb-8"
                    >
                      Client Phone <span className="text-danger-600">*</span>
                    </label>
                    <input
                      type="email"
                      className="form-control radius-8"
                      id="number"
                      placeholder="Enter phone number"
                    />
                  </div>
                  <div className="d-flex align-items-center justify-content-center gap-3">
                    <button
                      type="button"
                      className="border border-danger-600 bg-hover-danger-200 text-danger-600 text-md px-56 py-11 radius-8"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="btn btn-primary border border-primary-600 text-md px-56 py-12 radius-8"
                    >
                      Save
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditContestLayer;
