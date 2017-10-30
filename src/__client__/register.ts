const form: HTMLFormElement = <HTMLFormElement>document.getElementById('form-register');

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const password: HTMLInputElement = <HTMLInputElement>document.getElementsByName('password')[0];
  const password_confirm: HTMLInputElement = <HTMLInputElement>document.getElementsByName('password_confirm')[0];

  if (password && password_confirm) {
    if (password.value !== password_confirm.value) {
      password.value = '';
      password_confirm.value = '';
      document.getElementById('message').innerHTML = `<div class="message-error">
      <i class="fa fa-exclamation-triangle" aria-hidden="true"></i>
      Senhas não combinam!
      </div>`;
      return;
    }
  }
  form.submit();
});