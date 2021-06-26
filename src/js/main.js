import '../scss/app.scss';
import { focusLoop } from './modules/_focusLoop.mjs';
import { importFontAwesome } from './modules/_fontAwesome.mjs';
import { GlobalMenu } from './modules/_globalMenu.mjs';
import { headerStyleChanger } from './modules/_l-header-styleChange.mjs';

headerStyleChanger();
GlobalMenu();
importFontAwesome();
focusLoop();