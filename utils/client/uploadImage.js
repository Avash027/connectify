import axios from "axios";

const uploadPic = async (media) => {
  try {
    const form = new FormData();
    form.append("file", media);
    form.append("upload_preset", "social_media");
    form.append("cloud_name", "dxdpj87op");

    const { data } = await axios.post(process.env.CLOUDINARY_URL, form);

    return data.url;
  } catch (error) {
    return;
  }
};

export default uploadPic;
