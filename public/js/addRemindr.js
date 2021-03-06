

const createButtonHandler = async (event) => {
  event.preventDefault();

  // Collect values from the login form
  const event_name = document.querySelector('#event_name').value.trim();
  const description = document.querySelector('#description').value.trim();
  const content = document.querySelector('#content').value.trim();
  const send_date = document.querySelector('#send_date').value.trim();
  const send_time = document.querySelector('#send_time').value.trim();
  const am_pm = document.querySelector('input[name="ampm"]:checked').value.trim();
  

  if (event_name && description && content && send_date && send_time && am_pm) {
    // Send a POST request to the API endpoint
    const response = await fetch(`/api/messages/`, {
      method: 'POST',
      body: JSON.stringify({ event_name, description, content, send_date, send_time, am_pm }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      // If successful, redirect the browser to the profile page

      const result = await Swal.fire({
        title: 'Congratulations!',

        text: 'You successfully added a new Remindr!',
        icon: 'success',
        showCancelButton: true,
        confirmButtonText: 'Thank you!',
      })

      if (result.isConfirmed) {
        document.location.replace(`/profile`);
      } 

    } else {
      alert(response.statusText);
    }
  }
};

const cancelButtonHandler = async (event) => {
  event.preventDefault();

  const result = await Swal.fire({
    title: 'Are you sure?',
    text: 'All data will be lost, and not recoverable',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes, cancel!',
    cancelButtonText: 'No, I will complete'
  })

  if (result.isConfirmed) {
    document.location.replace(`/profile`);
  } else if (result.dismiss === Swal.DismissReason.cancel) {
    return
  }
  
};

document
  .querySelector('#create-remindr')
  .addEventListener('click', createButtonHandler);

document
  .querySelector('#cancel')
  .addEventListener('click', cancelButtonHandler);


