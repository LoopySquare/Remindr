
const saveButtonHandler = async (event) => {
  event.preventDefault ();

  const id = event.target.getAttribute('data-editId');

  console.log(id);

  // Collect values from the login form

  const first_name = document.querySelector('#first-name').value.trim();
  const last_name = document.querySelector('#last-name').value.trim();
  const phone = formatPhone(document.querySelector('#phone').value.trim());

  console.log(phone.length);

  const validName = await validateName(first_name, last_name);
  const validPhone = await validatePhone(phone);

  console.log(validPhone);

  if(!validName){
    return;
  }

  if(!validPhone){
    return;
  } 

  if (first_name && last_name && phone && validName && validPhone) {

    console.log('Sending Fetch');
    const response = await fetch(`/api/users/account/edit/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ first_name, last_name, phone }),
      headers: { 'Content-Type': 'application/json' },
    });
    
    if (response.ok) {
      // If successful, redirect the browser to the profile page
        document.location.replace('/profile');
    } else {
      alert(response.statusText);
    }  
  }   
};


const cancelButtonHandler = async (event) => {
  event.preventDefault();

  Swal.fire({
    title: 'Are you sure?',
    text: 'You will be returned to your Account Page.',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes, cancel!',
    cancelButtonText: 'No, I will complete'
  }).then((result) => {
    if (result.isConfirmed) {
      document.location.replace(`/profile`);
    // For more information about handling dismissals please visit
    // https://sweetalert2.github.io/#handling-dismissals
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      return
    }
  })
};

const updatePasswordHandler = async () => {
  
  document.location.replace(`/account/password/update`);

};

const validateName = async (fname, lname) => {

  if(fname == '' && lname == ''){
    swal.fire("Please Enter your Name");
    document.querySelector('#first-name').focus();
    return false;
  }

  if(fname == ''){
    swal.fire("Please Enter your First Name");
    document.querySelector('#first-name').focus();
    return false;
  }

  if(lname == '' ){
    swal.fire("Please Enter your Last Name");
    document.querySelector('#last-name').focus();
    return false;
  }

  return true;

}

const formatPhone = (phone) => {

  return phone.replace(/\D/g, '');
}

const validatePhone = async (phone) => {

  if(phone === '' || phone.length !== 10){
    swal.fire("Please Enter a 10 Digit Phone Number");
    document.querySelector('#phone').focus();
    return false;
  }
    return true;
}


document
  .querySelector('#save-profile')
  .addEventListener('click', saveButtonHandler);

document
  .querySelector('#cancel')
  .addEventListener('click', cancelButtonHandler);

document
  .querySelector('#update-password')
  .addEventListener('click', updatePasswordHandler);

