
function create(video) {
    return fetch('http://localhost:8080/videos', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(video),
    }).then(async (data) => {
        if (data.ok) {
            const response = await data.json();
            return response;
        }
        throw new Error('Não foi possível cadastrar os dados');
    })
}

export default {
    create,
}