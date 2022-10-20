const createBtnHandler = async (event) => {
    event.preventDefault();

    const title = document.querySelector('#will-title').value.trim();
    const name = document.querySelector('#item-desc').value.trim();

    if (title && name) {
        const response = await fetch(`/api/wills`, {
            method: 'POST',
            body: JSON.stringify({ title, name }),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert('Failed to create new will.')
        }
    }
};



document
    .querySelector('.new-will-form')
    .addEventListener('submit', createBtnHandler);