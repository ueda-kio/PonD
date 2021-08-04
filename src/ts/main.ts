import '../scss/app.scss';
import { init } from './_init';
import './modules/Classes/_FormValidation'
// import './modules/Class/_Modal'
import './modules/Classes/_FocusLoop'
import { GlobalMenu } from './modules/_globalMenu';
import { headerStyleChanger } from './modules/_l-header-styleChange';
// import { swiper } from './modules/_swiper';
import { btnPressToDisabled } from './modules/_btnPressToDisabled';

init()

headerStyleChanger();

GlobalMenu();

// swiper();

btnPressToDisabled();
