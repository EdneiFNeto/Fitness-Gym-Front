import swal from "@sweetalert/with-react";

const swalloader = async (content, timer, buttons, closeOnClickOutside) => {
  return await swal(content, {
    buttons: false,
    closeOnClickOutside: closeOnClickOutside,
    timer: timer,
  });
};


const swalerror = async (message, closeOnClickOutside) => {
  return await swal({
    icon: "error",
    title: message,
    closeOnClickOutside: closeOnClickOutside,
  });
};

const swalsuccess = async (message, closeOnClickOutside) => {
  return await swal({
    icon: "success",
    title: message,
    closeOnClickOutside: closeOnClickOutside,
  });
};

const swalsuccessredirect = async (message, closeOnClickOutside, url) => {
  return await swal({
    icon: "success",
    title: message,
    closeOnClickOutside: closeOnClickOutside,
  }).then(function () {
    window.location.href = url;
  },
  )
};

export { 
  swalloader, 
  swalsuccess, 
  swalerror, 
  swalsuccessredirect,
};
