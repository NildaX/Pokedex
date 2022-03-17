const fetchPokemon = () => {
    const pokeNameInput = document.getElementById("pokeName");
    let pokeName = pokeNameInput.value;
    pokeName = pokeName.toLowerCase();
    const url = `https://pokeapi.co/api/v2/pokemon/${pokeName}`;
    fetch(url).then((res) => {
        if (res.status != "200") {
            console.log(res);
            pokeImage("/Pokedex/assets/images/pokemon-sad.jpg");
            (document.getElementById("name")).value="Not found";
            (document.getElementById("numero")).value="#00";
            (document.getElementById("habilidades")).value="--";
            (document.getElementById("habilidadese")).value="--";
            (document.getElementById("tipo1")).value="--";
            (document.getElementById("tipo2")).value="--";
            (document.getElementById("hp")).value=0;
            (document.getElementById("attack")).value=0;
            document.getElementById("divhp").style.width ='0px';
            document.getElementById("divattack").style.width = '0px';
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
            
            const url2 = `https://pokeapi.co/api/v2/characteristic/${data['id']}`;
            fetch(url2).then((res2) => {
                if (res2.status != "200") {
                    console.log("NOT FOUND");
                    (document.getElementById("descripcion")).value="Characteristic not found";
                }
                else {
                    return res2.json();
                }
                }).then((data2) => {
                    console.log(data2);
                    (document.getElementById("descripcion")).value=data2['descriptions'][7]['description'];

            });
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
