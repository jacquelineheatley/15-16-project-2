const createBtnHandler = async (event) => {
    event.preventDefault();

    const title = document.querySelector('#will-title').value.trim();
    const name = document.querySelector('#item-desc').value.trim();
    const items = document.querySelectorAll('.will-item');
    const itemValues = Array.from(items).map( (textarea) => {
        console.log(textarea);
        return textarea.value.trim();
    });

    if (title && name && items) {
        const response = await fetch(`/api/wills`, {
            method: 'POST',
            body: JSON.stringify({ title, name, itemValues }),
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