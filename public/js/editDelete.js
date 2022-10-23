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



document
    .querySelector('.will-list')
    .addEventListener('click', delBtnHandler);