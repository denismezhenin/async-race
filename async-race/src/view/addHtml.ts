import { tsQuerySelector } from '../components/helpers';
import { headerHTML } from './header';
import { mainPageHTML } from './mainPage';

export const addHTML = () => {
    const header = document.createElement('header');
    const main = document.createElement('main');
    main.classList.add('main');
    const body = tsQuerySelector(document, 'body');
    header.innerHTML = headerHTML;
    main.innerHTML = mainPageHTML;
    body.append(header);
    body.append(main);
};
