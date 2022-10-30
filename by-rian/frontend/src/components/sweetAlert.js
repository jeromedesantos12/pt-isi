import Swal from "sweetalert2";

const FlashMessage = (title, type, text, icon) => {
  return Swal.fire({
    title: title,
    type: type,
    text: text,
    icon: icon,
  });
};

export default FlashMessage;
