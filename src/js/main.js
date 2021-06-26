import '../scss/app.scss';
import { importFontAwesome } from './modules/_fontAwesome.mjs';
import { GlobalMenu } from './modules/_hamburgerMenu.mjs';
import { headerStyleChanger } from './modules/_l-header-styleChange.mjs';

headerStyleChanger();
GlobalMenu();
importFontAwesome();