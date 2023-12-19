
  const form = document.getElementById('form');
  const usernameInput = document.getElementById('nick');
  const inputemail = document.getElementById('email');
  const togglePassword = document.querySelector('.toggle-password');
  const passwordInput = document.getElementById('password');
  const password2 = document.getElementById('password2');
  const inputname = document.getElementById('name')
  const id = document.getElementById('id');
// Show input error message

// Show success outline
const showSuccess = (input) => {
  const formControl = input.parentElement;
  formControl.className = 'form-control success';
}


// Get field name
const getFieldName = (input) => {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

// Check required fields
const checkRequired = (inputArr) => {
  inputArr.forEach(input => {
    if (input.value.trim() === '') {
      showError(input, `${getFieldName(input)} is required`);
    } else {
      showSuccess(input);
    }
  })
}

// usernameInput.addEventListener('blur', () => {
//   const username = usernameInput.value;
//   if (username.trim() !== '') {
//     checkUsernameAvailability(username);
//   }
// });

togglePassword.addEventListener('click', () => {
  if (passwordInput.type === 'password') {
    passwordInput.type = 'text';
    togglePassword.classList.remove('fa-eye');
    togglePassword.classList.add('fa-eye-slash');
  } else {
    passwordInput.type = 'password';
    togglePassword.classList.remove('fa-eye-slash');
    togglePassword.classList.add('fa-eye');
  }
}); 

// Check passwords match

