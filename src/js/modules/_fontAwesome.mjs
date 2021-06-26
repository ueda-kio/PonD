import {dom, library} from '@fortawesome/fontawesome-svg-core';
import {faAngleRight, faExternalLinkAlt, faAngleDoubleRight} from '@fortawesome/free-solid-svg-icons';

export const importFontAwesome = () => {

  library.add(faAngleRight, faExternalLinkAlt, faAngleDoubleRight);

  dom.i2svg();
};