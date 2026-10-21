window.onload = function () {
  const inicio = document.getElementById("inicio");
  const videoIntro = document.getElementById("videoIntro");
  const elegante = document.getElementById("elegante");
  const musica = document.getElementById("musica");
  const videoFondo = document.getElementById("videoFondoInvitacion");
  let iniciado = false;

  // Iniciar la experiencia al hacer clic
  inicio.addEventListener("click", (e) => {
    if (iniciado) return;
    iniciado = true;
    
    const mensaje = document.getElementById("mensaje");
    if (mensaje) mensaje.style.display = "none";
    
    // Activar sonido de la intro
    videoIntro.muted = false;
    
    // Intentar reproducir la intro
    videoIntro.play().catch(error => {
      console.log("Error al reproducir video:", error);
      continuarConInvitacion();
    });

    videoIntro.onended = () => {
      continuarConInvitacion();
    };
    
    function continuarConInvitacion() {
      inicio.style.opacity = "0";
      setTimeout(() => {
        inicio.classList.remove("activa");
        elegante.classList.add("activa");
        
        if (videoFondo) {
          videoFondo.play().catch(e => console.log("Error video fondo:", e));
        }
        if (musica) {
          musica.volume = 0.4;
          musica.loop = true;
          musica.play().catch(e => console.log("Error música:", e));
        }
      }, 1000);
    }
  });

  

  // ========== CUENTA REGRESIVA EN LA SECCIÓN SIGUIENTE ==========
  // Fecha y hora de Argentina (UTC-03:00): 28/11/2026 a las 22:00.
  const fechaCuenta = new Date("2026-11-28T22:00:00-03:00").getTime();
  const camposCuenta = {
    dias: document.getElementById("diasCuenta"),
    horas: document.getElementById("horasCuenta"),
    minutos: document.getElementById("minutosCuenta"),
    segundos: document.getElementById("segundosCuenta")
  };
  const mensajeCuenta = document.getElementById("mensajeCuenta");
  let intervaloCuenta = null;
  function actualizarCuenta() {
    const diferencia = fechaCuenta - Date.now();
    if (diferencia <= 0) {
      Object.values(camposCuenta).forEach(el => { if (el) el.textContent = "00"; });
      if (mensajeCuenta) {
        mensajeCuenta.textContent = "¡Llegó el gran día!";
        mensajeCuenta.classList.add("expired");
      }
      if (intervaloCuenta) clearInterval(intervaloCuenta);
      return;
    }
    const total = Math.floor(diferencia / 1000);
    if (camposCuenta.dias) camposCuenta.dias.textContent = String(Math.floor(total / 86400)).padStart(2, "0");
    if (camposCuenta.horas) camposCuenta.horas.textContent = String(Math.floor((total % 86400) / 3600)).padStart(2, "0");
    if (camposCuenta.minutos) camposCuenta.minutos.textContent = String(Math.floor((total % 3600) / 60)).padStart(2, "0");
    if (camposCuenta.segundos) camposCuenta.segundos.textContent = String(total % 60).padStart(2, "0");
  }
  actualizarCuenta();
  intervaloCuenta = setInterval(actualizarCuenta, 1000);

  // Botón de datos bancarios
  const btnBancarios = document.getElementById("btnBancarios");
  if (btnBancarios) {
    btnBancarios.addEventListener("click", () => {
      const datosDiv = document.getElementById("datosBancarios");
      if (datosDiv) {
        if (datosDiv.style.display === "none" || datosDiv.style.display === "") {
          datosDiv.style.display = "block";
          btnBancarios.textContent = "🙈 OCULTAR DATOS";
        } else {
          datosDiv.style.display = "none";
          btnBancarios.textContent = "💳 DATOS BANCARIOS";
        }
      }
    });
  }

  // Botón de confirmar asistencia
  const btnConfirmar = document.getElementById("btnConfirmar");
  if (btnConfirmar) {
    btnConfirmar.addEventListener("click", (e) => {
      e.preventDefault();
      const mensajeConfirmacion = encodeURIComponent("¡Hola! Quiero confirmar mi asistencia a tus 15 años ✨");
      window.open(`https://wa.me/+5493855162225?text=${mensajeConfirmacion}`, "_blank");
    });
  }

  // Botón de WhatsApp
  const btnWhatsapp = document.getElementById("btnWhatsapp");
  if (btnWhatsapp) {
    btnWhatsapp.addEventListener("click", (e) => {
      e.preventDefault();
      const mensaje = encodeURIComponent("¡Hola! Quiero confirmar mi asistencia a tus 15 años ✨");
      window.open(`https://wa.me/+5493855162225?text=${mensaje}`, "_blank");
    });
  }
};