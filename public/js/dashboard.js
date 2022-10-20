const createBtnHandler = async (event) => {
    event.preventDefault();

    const willTitle = document.querySelector('#will-title').value.trim();
    const items = document.querySelector('#item-desc').value.trim();
    const items2 = document.querySelector('#item-desc2').value.trim();
    // const items3 = document.querySelector('#item-desc3').value.trim();

    if (willTitle && items && items2) {
        const response = await fetch(`/api/wills`, {
            method: 'POST',
            body: JSON.stringify({ willTitle, items, items2 }),
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