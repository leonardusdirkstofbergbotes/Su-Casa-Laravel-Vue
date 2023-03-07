import { onMounted, ref, watch } from 'vue';
export default {
    name: "InputTime",

    props: {
      required: {
          type: Boolean,
          default: false
      },
      error: {
          type: String,
          default: ""
      },
      disabled: {
          type: Boolean,
          default: false
      },
      multiple: {
        type: Boolean,
        default: false
      },
      initialImagePath: {
        type: String
      },
      modelValue: File
    },

    emits: [
        'update:modelValue'
    ],

    setup(props, { emit }) {
        const previewUrl = ref();
        const fileSelected = ref<File>();
        const tempImageName = ref<string | null>(null);

        const pickFile = (files: File[]) => {
            if (!props.multiple) {
                const file = files[0];

                createPreviewUrl(file);
            }
        };

        const createPreviewUrl = (file: File) => {
            let reader = new FileReader
            reader.onload = e => {
                previewUrl.value = e.target?.result;
                fileSelected.value = file;
            }
            reader.readAsDataURL(file);
        };

        watch(previewUrl, (newPreviewUrl) => {
            if (newPreviewUrl != null) {
                emit('update:modelValue', fileSelected.value);
            }
        });

        const GetFileBlobUsingURL = function (url, convertBlob) {
            var xhr = new XMLHttpRequest();
            xhr.open("GET", url);
            xhr.responseType = "blob";
            xhr.addEventListener('load', function() {
                convertBlob(xhr.response);
            });
            xhr.send();
        };

        const blobToFile = function (blob, name) {
                blob.lastModifiedDate = new Date();
                blob.name = name;
                return blob;
        };

        const GetFileObjectFromURL = function(filePathOrUrl, convertBlob) {
            GetFileBlobUsingURL(filePathOrUrl, function (blob) {
                convertBlob(blobToFile(blob, tempImageName.value));
            });
        };

        watch(() => props.initialImagePath, (imagePathFromParent) => {
            if (imagePathFromParent != null) {
                const imagePathArray = imagePathFromParent.split('\\');
                tempImageName.value = imagePathArray[imagePathArray.length - 1];

                GetFileObjectFromURL(imagePathFromParent, (fileObject: File) => {
                    createPreviewUrl(fileObject);
                    console.log(fileObject);
                });
            }
        });

        return {
            previewUrl,
            pickFile
        }
    }
  }
