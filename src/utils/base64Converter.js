export function toBase64(file) {
  return new Promise((resolve, reject) => {
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    } else reject(new Error('File Not Found'));
  });
}

export default toBase64;
