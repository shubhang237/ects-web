let url = 'http://localhost:8000/api/products';
export default function getProducts(){
    return fetch(url, {   
            method  : 'GET',
            'Content-Type': 'application/json',
        })
        .then(res => res.json())
        .then(res => {
            return res;
        });
}