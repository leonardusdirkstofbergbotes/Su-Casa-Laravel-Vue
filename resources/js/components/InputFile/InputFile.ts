import { ref, watch } from 'vue';
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

        watch(() => props.initialImagePath, (imagePathFromParent) => {
            if (imagePathFromParent != null) {
                fetch(imagePathFromParent)
                    .then((res) => res.blob())
                    .then((blob: any) => {
                        const imagePathArray = imagePathFromParent.split('\\');
                        const filename = imagePathArray[imagePathArray.length - 1];
                        blob.lastModified = new Date();

                        const fileObject = new File([blob], filename, {
                            type: blob.type
                        });

                        createPreviewUrl(fileObject);
                    })
                ;
            }
            else previewUrl.value = null;
        });

        return {
            previewUrl,
            pickFile
        }
    }
  }
