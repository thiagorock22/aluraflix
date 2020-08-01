
function getAll() {
    return fetch('http://localhost:8080/categorias').then(async (data) => {
        if (data.ok) {
            const response = await data.json();
            return response;
        }
        throw new Error('Não foi possível pegar os dados');
    })
}

function getAllWithVideos() {
    return fetch('http://localhost:8080/categorias?_embed=videos').then(async (data) => {
        if (data.ok) {
            const response = await data.json();
            return response;
        }
        throw new Error('Não foi possível pegar os dados');
    })
}

export default {
    getAllWithVideos,
    getAll
}