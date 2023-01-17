import './styles/style.scss';
import { headerHTML } from "./view/header";
import { mainPageHTML } from "./view/mainPage";
import { tsQuerySelector } from "./components/helpers";
import { renderCarField } from "./view/car";


const renderPage = () => {
  tsQuerySelector(document, '.header').innerHTML = headerHTML;
  tsQuerySelector(document, '.main').innerHTML = mainPageHTML;
  const car = renderCarField()
  tsQuerySelector(document, '.garage__car-list').append(car)
}



window.addEventListener('load', renderPage);