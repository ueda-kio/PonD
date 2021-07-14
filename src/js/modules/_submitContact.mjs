import { htmlspecialchars } from "./_htmlspecialchars.mjs";

export const submitContact = (_form) => {
  const form = _form;
  let type = '';
  let name = '';
  let companyName = '';
  let email  = '';
  let detail = '';
  let adv = '';

  const getValues = (form) => {
    const inputs = form.querySelectorAll('input, textarea, select');

    inputs.forEach((input) => {
      switch(true) {
        case(input.type === 'radio'): {
          switch(true) {
            case(input.value === 'radio01'):
              type = 'お仕事のご依頼・ご相談';
              break;
            case(input.value === 'radio02'):
              type = 'お見積りのご依頼';
              break;
            case(input.value === 'radio03'):
              type = '採用について';
              break;
            case(input.value === 'radio04'):
              type = 'その他';
              break;
          }
          break;
        }
        case(input.name === 'name'):
          name = htmlspecialchars(input.value);
          break;
        case(input.name === 'companyName'):
          companyName = htmlspecialchars(input.value);
          break;
        case(input.name === 'email'):
          email = htmlspecialchars(input.value);
          break;
        case(input.name === 'detail'):
          detail = htmlspecialchars(input.value);
          break;
        case(input.name === 'adv'):
          switch(true) {
            case(input.value === 'search'):
              adv = 'Google/Yahoo検索';
              break;
            case(input.value === 'sns'):
              adv = 'SNS';
              break;
            case(input.value === 'friends'):
              adv = '友人や知人';
              break;
            case(input.value === 'blog'):
              adv = 'ブログ';
              break;
            case(input.value === 'other'):
              adv = 'その他';
              break;
          }
          break;
      }
    });
  }

  const fetchValues = () => {
    const url = 'https://hooks.slack.com/services/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';

    const payload = {
      text: `
      お問い合わせがありました。
      PON DESIGNをどちらでお知りになりましたか？：${adv}
      お問合せ種別：${type}
      お名前：${name}
      会社名：${companyName || '記入なし'}
      メールアドレス：${email}
      【お問合せ内容】
      ${detail}
      `.replace(/^\n|\s+$|^ {4}/gm, '')
    };

    fetch(url, {
      method: 'POST',
      body: JSON.stringify(payload)
    })
    .then(() => {
      document.getElementById('submit').disabled = true;
    })
  }

  const init = () => {
    getValues(form);
    fetchValues();
  }
  init();
}