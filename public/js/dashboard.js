const createBtnHandler = async (event) => {
    e.preventDefault();

    const willTitle = document.querySelector('#will-title').value.trim();
    const items = document.querySelector('#item-desc').value.trim();

    if (willTitle && items) {
        const response = await fetch(`/api/wills`, {
            method: 'POST',
            body: JSON.stringify({ willTitle, items }),
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