const delBtnHandler = async (event) => {
    if (event.target.hasAttribute('data-id')) {
        const id = event.target.getAttribute('data-id');

        const response = await fetch(`/api/wills/${id}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert('Failed to delete will.')
        }
    
}
}


const updateBtnHandler = async (event) => {
    event.preventDefault();
  
    const id = will.getElementById('save-button');
  
    const response = await fetch(`/api/blogs/${id}`, {
      method: "PUT",
      body: JSON.stringify({
        title,
        content
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    if (response.ok) {
      document.location.replace(`/dashboard/`);
    } else if (req.session.user_id != req.params.id) {
      res.redirect('/homepage/');
    } else {
      alert(response.statusText);
    }
  
  }

document.querySelector('.button').addEventListener('submit', updateBtnHandler);


document
    .querySelector('.will-list')
    .addEventListener('click', delBtnHandler);