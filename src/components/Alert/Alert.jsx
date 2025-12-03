import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import './Alert.css'

const MySwal = withReactContent(Swal);

const Alert = {
  success: (title = "¡Éxito!", text = "", confirmButtonText = "OK") => {
    return MySwal.fire({
      title,
      text,
      icon: "success",
      confirmButtonText
    });
  },

  error: (title = "¡Error!", text = "", confirmButtonText = "OK") => {
    return MySwal.fire({
      title,
      text,
      icon: "error",
      confirmButtonText
    });
  },

  warning: (title = "¡Atención!", text = "", confirmButtonText = "OK") => {
    return MySwal.fire({
      title,
      text,
      icon: "warning",
      confirmButtonText
    });
  },

  info: (title = "Información", text = "", confirmButtonText = "OK") => {
    return MySwal.fire({
      title,
      text,
      icon: "info",
      confirmButtonText
    });
  },

  confirm: ({
    title = "¿Estás seguro?",
    text = "",
    confirmButtonText = "Sí",
    cancelButtonText = "Cancelar",
    onConfirm = null,
    onCancel = null,
    icon = "question"
  }) => {
    return MySwal.fire({
      title,
      text,
      icon,
      showCancelButton: true,
      confirmButtonText,
      cancelButtonText
    }).then((result) => {
      if (result.isConfirmed && onConfirm) onConfirm();
      if (result.isDismissed && onCancel) onCancel();
    });
  }
};

export default Alert;
