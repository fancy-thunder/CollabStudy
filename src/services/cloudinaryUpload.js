import axios from "axios";

const CLOUD_NAME = "dx1ays0ph";

/**
 * Upload file to Cloudinary
 * @param {FormData} data - FormData containing the file
 * @param {string} type - Upload type: "image" or "video" (default: "image")
 * @returns {Promise} - Axios response with upload result
 */
async function uploadCloudinary(data, type = "image") {
  const validTypes = ["image", "video"];
  const uploadType = validTypes.includes(type) ? type : "image";

  const res = await axios.post(
    `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/${uploadType}/upload`,
    data
  );
  return res;
}

export default uploadCloudinary;