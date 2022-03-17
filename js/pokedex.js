const fetchPokemon = () => {
    const pokeNameInput = document.getElementById("pokeName");
    let pokeName = pokeNameInput.value;
    pokeName = pokeName.toLowerCase();
    const url = `https://pokeapi.co/api/v2/pokemon/${pokeName}`;
    fetch(url).then((res) => {
        if (res.status != "200") {
            console.log(res);
            pokeImage("/Pokedex/assets/images/pokemon-sad.jpg")
        }
        else {
            return res.json();
        }
    }).then((data) => {
        if (data) {
            console.log(data);
            let pokeImg = data.sprites.front_default;
            pokeImage(pokeImg);
            console.log(pokeImg);
            (document.getElementById("name")).value=data['name'];
            (document.getElementById("numero")).value="#00"+data['id'];
            (document.getElementById("habilidades")).value=data['abilities'][0]['ability']['name'];
            (document.getElementById("habilidadese")).value=data['abilities'][1]['ability']['name'];
            (document.getElementById("tipo1")).value=data['types'][0]['type']['name'];
            (document.getElementById("hp")).value=data['stats'][0]['base_stat'];
            (document.getElementById("attack")).value=data['stats'][1]['base_stat'];
            document.getElementById("divhp").style.width = data['stats'][0]['base_stat']+'px';
            document.getElementById("divattack").style.width = data['stats'][1]['base_stat']+'px';
            try {
                (document.getElementById("tipo2")).value=data['types'][1]['type']['name'];
                document.getElementById("tipo2").style.display = "block";
             }
             catch (e) {
                document.getElementById("tipo2").style.display = "none";
             }

            
            console.log(data['abilities'][0]['ability']['name']);
            console.log(data['abilities'][1]['ability']['name']);
        }
    });
}

const pokeImage = (url) => {
    const pokePhoto = document.getElementById("pokeImg");
    pokePhoto.src = url;
}
