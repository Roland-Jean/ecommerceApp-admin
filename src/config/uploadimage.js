const uploadToCloudinary = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "ecommerce");

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/dce1fl8qu/image/upload`,
    {
      method: "POST",
      body: formData,
    }
  );

  return response.json();
};



const handleUpload = async (file) => {
  // Upload to Cloudinary
  const cloudinaryResponse = await uploadToCloudinary(file);

  // Save URL to your database via Spring Boot API
  await fetch("/api/images", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      imageUrl: cloudinaryResponse.secure_url,
    }),
  });
};