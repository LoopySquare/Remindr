const resetPasswordFormHandler = async (event) => {
    event.preventDefault();
  
    // Collect values from the login form
    const newPassword = document.querySelector('#new-password').value.trim();
    const confirmPassword = document.querySelector('#confirm-password').value.trim();
  
    const passMatch = await validatePass(newPassword, confirmPassword);
  
     if(!passMatch) {
      blankPass();
      document.querySelector('#new-password').focus();
      return;
    } 
    
    if (newPassword && confirmPassword) {
  
      const response = await fetch(`/api/users/password/update/`, {
        method: 'PUT',
        body: JSON.stringify({ newPassword }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        Swal.fire({
          title: 'Congratulations!',
          text: 'Your Password has been updated!',
          icon: 'success',
          showCancelButton: true,
          confirmButtonText: 'Thank you!',
        }).then((result) => {
          if (result.isConfirmed) {
            document.location.replace(`/profile`);
          // For more information about handling dismissals please visit
          // https://sweetalert2.github.io/#handling-dismissals
          } 
        })
      } else {
        swal.fire("Current Password Does not match what's on record");
        document.querySelector('#current-password').focus();
        document.getElementById("current-password").classList.add('is-danger');
      }
    }
  };
  
  // VALIDATE PASSWORD AND CONFIRM PASSWORD ARE THE SAME AND PROPER LEN
  const validatePass = async (newPass, confirmPass) => {
    
    if(newPass === ''){
      swal.fire("Please Your New Password");
      return false;
    }
  
    if(newPass.length < 8){
      swal.fire("Password must be more than 8 Characters");
      return false;
    }
  
    if(newPass !== confirmPass) {
      swal.fire("New Password / Confirm New Password did not match");
      return false;
    } else {
      return true;
    }
  
  }
  
  // BLANK OUT PW FIELDS UPON REFRESHES
  const blankPass = () => {
    document.querySelector('#new-password').value = ""
    document.querySelector('#confirm-password').value = ""
  }
  
  document
    .querySelector('#update-password')
    .addEventListener('click', resetPasswordFormHandler);
  