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
            (document.getElementById("defense")).value=0;
            document.getElementById("divdefense").style.width = '0px';
            (document.getElementById("spattack")).value=0;
            document.getElementById("divspattack").style.width = '0px';
            (document.getElementById("spdefense")).value=0;
            document.getElementById("divspdefense").style.width ='0px';
            (document.getElementById("speed")).value=0;
            document.getElementById("divspeed").style.width = '0px';
            (document.getElementById("descripcion")).value="--";
            (document.getElementById("movimientos")).value="--";
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
            (document.getElementById("tipo1")).value=data['types'][0]['type']['name'];
            (document.getElementById("hp")).value=data['stats'][0]['base_stat'];
            document.getElementById("divhp").style.width = data['stats'][0]['base_stat']+'%';
            (document.getElementById("attack")).value=data['stats'][1]['base_stat'];
            document.getElementById("divattack").style.width = data['stats'][1]['base_stat']+'%';
            (document.getElementById("defense")).value=data['stats'][2]['base_stat'];
            document.getElementById("divdefense").style.width = data['stats'][2]['base_stat']+'%';
            (document.getElementById("spattack")).value=data['stats'][3]['base_stat'];
            document.getElementById("divspattack").style.width = data['stats'][3]['base_stat']+'%';
            (document.getElementById("spdefense")).value=data['stats'][4]['base_stat'];
            document.getElementById("divspdefense").style.width = data['stats'][4]['base_stat']+'%';
            (document.getElementById("speed")).value=data['stats'][5]['base_stat'];
            document.getElementById("divspeed").style.width = data['stats'][5]['base_stat']+'%';
            movimi="Moves:  ";
            for (var i = 0; i <data['moves'].length ; i++) {
                movimi=movimi+data['moves'][i]['move']['name']+", ";
             }
            (document.getElementById("movimientos")).value=movimi;
            
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
             (document.getElementById("habilidadese")).value=data['abilities'][1]['ability']['name'];

            
            console.log(data['abilities'][0]['ability']['name']);
            console.log(data['abilities'][1]['ability']['name']);
        }
    });
}

const pokeImage = (url) => {
    const pokePhoto = document.getElementById("pokeImg");
    pokePhoto.src = url;
}
