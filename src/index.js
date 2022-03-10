import NanaMourisan from "@images/nana-san.jfif";
import "./index.scss";

const helloWebpack = () => {
  const element = document.createElement("h1");
  const card = document.createElement("div");

  const span1 = document.createElement("span");
  const span2 = document.createElement("span");
  const span3 = document.createElement("span");

  const helloObject = { hello: "Hello", webpack: "Webpack" };
  const { hello, webpack } = helloObject;

  element.innerText = `${hello} from ${webpack}`;

  span1.innerText = "WIP";
  span2.innerText = "Installing dependencies";
  span3.innerText = "Getting started";

  card.classList.add("card");
  card.classList.add("br5");
  card.classList.add("bg--white");

  element.classList.add("txt--blue-D5");
  element.classList.add("fsz5");
  element.classList.add("mb4");

  span1.classList.add("bdg--sld-blue-D5");
  span2.classList.add("bdg--sld-blue-D7");
  span3.classList.add("bdg--sld-blue-D9");

  span1.classList.add("mx2");
  span2.classList.add("mx2");
  span3.classList.add("mx2");

  card.appendChild(element);
  card.appendChild(span1);
  card.appendChild(span2);
  card.appendChild(span3);

  document.body.style.background = `url(${NanaMourisan})`;
  document.body.style.backgroundSize = `content`;
  document.body.style.backgroundPosition = `center`;
  document.body.style.backgroundRepeat = `no-repeat`;
  document.body.appendChild(card);
};

helloWebpack();
