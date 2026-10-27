// ===== DATOS DE CADA PAÍS: [nombre, fecha, texto] =====
const D = {
  guatemala: ["Guatemala", "15 de septiembre de 1821",
    "Guatemala fue sede de la Capitanía General, por eso allí se firmó el Acta de Independencia de Centroamérica. La independencia fue pacífica y dirigida por las élites criollas; el acta fue redactada por José Cecilio del Valle. Poco después, en 1822, la región se anexó al Imperio Mexicano de Iturbide. Al caer el imperio, formó parte de las Provincias Unidas del Centro de América (1823) y de la República Federal (1824). Guatemala se declaró república independiente en 1847, bajo Rafael Carrera."],

  belice: ["Belice", "21 de septiembre de 1981",
    "Su historia es distinta al resto de la región. Madereros británicos se asentaron desde el siglo XVII, y tras la Batalla de St. George's Caye (1798) frente a España se consolidó la presencia británica. En 1862 pasó a ser la colonia de Honduras Británica. Obtuvo autogobierno en 1964 y se independizó del Reino Unido el 21 de septiembre de 1981. Guatemala mantuvo por años una disputa territorial sobre Belice."],

  honduras: ["Honduras", "15 de septiembre de 1821",
    "La noticia de la independencia llegó a Comayagua pocos días después del 15 de septiembre de 1821, y las autoridades locales la aceptaron sin guerra. Honduras se unió brevemente al Imperio Mexicano y luego a la República Federal de Centroamérica, que tuvo como líder al hondureño Francisco Morazán. Con la crisis de la federación, Honduras se declaró estado soberano e independiente en 1838."],

  elsalvador: ["El Salvador", "5 de noviembre de 1811 · 15 de septiembre de 1821",
    "Fue pionero: el 5 de noviembre de 1811, José Matías Delgado, Manuel José Arce y otros impulsaron el primer grito de independencia en San Salvador, que fue reprimido. Hubo otra insurrección en 1814. En 1821 se sumó a la independencia y luego se resistió a la anexión a México (1822-1823). Fue parte de la federación centroamericana, y se separó de ella como estado soberano en 1841."],

  nicaragua: ["Nicaragua", "15 de septiembre de 1821",
    "En 1811 y 1812 hubo levantamientos en León y Granada contra las autoridades españolas. La independencia se proclamó en 1821, pero las ciudades rivales de León (liberal) y Granada (conservadora) se enfrentaron por el poder, lo que generó inestabilidad. Nicaragua se anexó a México, luego integró la federación centroamericana y se declaró estado independiente en 1838."],

  costarica: ["Costa Rica", "15 de septiembre de 1821 (noticia llegó el 13 de octubre)",
    "Por su lejanía, la noticia llegó a Cartago a fines de octubre de 1821. Las ciudades dudaron sobre qué hacer y el 1 de diciembre firmaron el Pacto de Concordia, su primera constitución provisional. En 1823 hubo una breve guerra civil (Ochomogo) entre quienes querían unirse a México y los republicanos, que ganaron. Costa Rica salió de la federación en 1838 y proclamó la República en 1848."],

  panama: ["Panamá", "28 de noviembre de 1821 · 3 de noviembre de 1903",
    "Panamá no formaba parte de la Capitanía de Guatemala, sino del Virreinato de Nueva Granada. El 10 de noviembre de 1821 ocurrió el Grito de La Villa de Los Santos, y el 28 de noviembre se proclamó la independencia de España, uniéndose de forma voluntaria a la Gran Colombia. El 3 de noviembre de 1903 se separó de Colombia, con apoyo de Estados Unidos, y nació la República de Panamá."]
};

// ===== ELEMENTOS (si no existen en el HTML, se crean) =====
let overlay = document.getElementById("overlay");
let popup = document.getElementById("popup");

if (!overlay) {
  overlay = document.createElement("div");
  overlay.id = "overlay";
  overlay.style.cssText =
    "position:fixed;inset:0;background:rgba(0,0,0,.45);display:none;" +
    "align-items:center;justify-content:center;z-index:20";
  document.body.appendChild(overlay);
}
if (!popup) {
  popup = document.createElement("div");
  popup.id = "popup";
  popup.style.cssText =
    "width:min(92vw,440px);height:min(92vw,440px);max-height:88vh;background:#fff;" +
    "color:#222;border-radius:14px;padding:1.1rem 1.2rem;overflow-y:auto;" +
    "box-shadow:0 10px 30px rgba(0,0,0,.4);box-sizing:border-box";
  overlay.appendChild(popup);
}

// ===== HIMNO =====
const himno = new Audio();
himno.volume = 0.7;

// ===== ABRIR Y CERRAR =====
function mostrar(estaAbierto) {
  // funciona con la clase "open" (CSS) y también con estilo directo
  overlay.classList.toggle("open", estaAbierto);
  overlay.style.display = estaAbierto ? "flex" : "none";
  document.body.style.overflow = estaAbierto ? "hidden" : "";
}

function abrir(k) {
  const datos = D[k];
  if (!datos) {
    console.error("País no encontrado:", k, "(revisa data-p en el HTML)");
    return;
  }
  const nombre = datos[0], fecha = datos[1], texto = datos[2];
  const src = "imagenes/" + k + ".jpg";

  popup.innerHTML =
    "<h2>" + nombre + "</h2>" +
    '<p class="fecha" style="color:#2b6cb0;font-weight:600">' + fecha + "</p>" +
    "<p>" + texto + "</p>" +
    '<img src="' + src + '" alt="Independencia de ' + nombre + '" ' +
    'style="width:100%;border-radius:10px;margin-top:.6rem;display:block" ' +
    "onerror=\"this.outerHTML='<div class=ph>Falta la imagen: '+this.getAttribute('src')+'</div>'\">" ;

  popup.scrollTop = 0;
  mostrar(true);                       // primero se muestra la información

  try {                                // después el himno (si falla, no importa)
    himno.src = "audio/" + k + ".mp3";
    himno.currentTime = 0;
    const r = himno.play();
    if (r && r.catch) r.catch(function () {});
  } catch (e) {
    console.warn("No se pudo reproducir el himno:", e);
  }
}

function cerrar() {
  mostrar(false);
  himno.pause();
}

// ===== CLICK EN LOS PAÍSES (funciona con cualquier elemento que tenga data-p) =====
document.addEventListener("click", function (e) {
  const pais = e.target.closest("[data-p]");
  if (pais) abrir(pais.dataset.p.toLowerCase().trim());
});
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") cerrar();
  if ((e.key === "Enter" || e.key === " ") && e.target.dataset && e.target.dataset.p) {
    e.preventDefault();
    abrir(e.target.dataset.p.toLowerCase().trim());
  }
});



// ===== BOTÓN "VOLVER AL MAPA" Y CLIC FUERA DEL POP-UP =====
const back = document.getElementById("back");
if (back) {
  back.addEventListener("click", function () {
    if (overlay.style.display === "flex") cerrar();
    else {
      const m = document.getElementById("mapa-seccion");
      if (m) m.scrollIntoView();
    }
  });
}
overlay.addEventListener("click", function (e) {
  if (e.target === overlay) cerrar();
});

// ===== ENCABEZADO: LA IMAGEN SE AGRANDA AL HACER SCROLL =====
const hero = document.getElementById("hero");
const heroImg = document.getElementById("heroImg");
const heroText = document.getElementById("heroText");
const cue = document.getElementById("cue");

function alScroll() {
  if (!hero || !heroImg) return;
  const max = hero.offsetHeight - window.innerHeight;
  const p = Math.min(Math.max(window.scrollY / max, 0), 1);
  heroImg.style.transform = "scale(" + (1 + 0.35 * p) + ")";
  if (heroText) heroText.style.transform = "scale(" + (1 + 0.15 * p) + ")";
  if (cue) cue.style.opacity = 1 - p * 4;
}
window.addEventListener("scroll", alScroll, { passive: true });
alScroll();