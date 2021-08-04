/**
 * 共通定数
 *
 * @summary 様々な場面でよく使う定数の宣言
 */

/** IEを考慮したdocument.scrollingElementのフォールバック */
export const SCROLL_ELEM = document.scrollingElement || /* IE */ document.documentElement;

/** aria-disabled属性を設定可能な要素（適宜変更する） */
export const ARIA_DISABLED_ELEMS = 'a[href], area[href], [aria-controls], [role="button"], [role="tab"]';

/** disabled属性を設定可能な要素 */
export const DISABLED_ELEMS = 'button, fieldset, input, link[rel="stylesheet"], option, optgroup, select, textarea';

/** JavaScriptの.focus()でフォーカス可能な要素 */
export const FOCUSABLE_ELEMS = 'a[href], area[href], [tabindex], button, input, select, textarea, iframe, object, audio, video, embed, summary';

/** Tabキー操作でフォーカス可能な要素 */
export const TABBABLE_ELEMS = 'a[href]:not([aria-disabled="true"]), area[href]:not([aria-disabled="true"]), [tabindex]:not([aria-disabled="true"]), button:not(:disabled), input:not(:disabled), select:not(:disabled), option:not(:disabled), optgroup:not(:disabled), textarea:not(:disabled), iframe, object, audio, video, embed, summary';
