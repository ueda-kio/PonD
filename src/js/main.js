import '../scss/app.scss';
import { focusLoop } from './modules/_focusLoop.mjs';
import './modules/Class/_FormValidation.mjs'
// import { importFontAwesome } from './modules/_fontAwesome.mjs';
import { GlobalMenu } from './modules/_globalMenu.mjs';
import { headerStyleChanger } from './modules/_l-header-styleChange.mjs';
import { swiper } from './modules/_swiper.js';

headerStyleChanger();
GlobalMenu();
// importFontAwesome();
focusLoop();
swiper();